import React, {ReactNode, PureComponent} from 'react';
import {StatusBar, StyleSheet, View, Image} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {GameEngine} from 'react-native-game-engine';
import {max, reduce, round, set} from 'lodash';
import {connect, ConnectedProps} from 'react-redux';

import BackgroundImage from '~assets/femfit/background.png';
import {BluetoothDevice} from '~state/ducks/bluetooth/bluetooth.interface';
import {PeripheralNotification} from '~constants/bluetooth/interface';
import {addServiceListener, removeServiceListener} from '~utils/bluetooth';
import {bleManagerEmitter} from '~hooks/useBluetooth';
import {UPDATE_INTERVAL_MS} from '~constants/bluetooth';
import {DeviceScreenProps} from '~routes/interface';
import {setSession} from '~state/ducks/session/session.reducer';
import {clearAnswers} from '~state/ducks/questions/questions.reducer';

import {ACTIVATION_THRESHOLD, SENSOR_SERVICE} from '../bluetooth/constants';
import {pressurePercent, readSensorBytes} from '../bluetooth/utils';

import GameOverDialog from './components/GameOverDialog';
import MenuDialog from './components/MenuDialog';
import Header from './components/Header';
import spawnEntities from './entities/spawnEntities';

import {ExerciseScheme, GameEntities} from './interface';
import Physics from './physics';
import constants from './constants';

const {MAX_HEIGHT, MAX_WIDTH} = constants;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setSession,
  clearAnswers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type FemfitGameProps = {
  device: BluetoothDevice;
  exercise: ExerciseScheme;
  navigation: DeviceScreenProps<'Femfit'>['navigation'];
} & PropsFromRedux;

type FemfitGameState = {
  running: boolean;
  gameOver: boolean;
  score: number;
  gameOverDialogVisible: boolean;
  sessionData: Record<number, number[]>;
};

/**
 * Component for rendering the gamified exercise for femfit devices
 */
class FemfitGame extends PureComponent<FemfitGameProps, FemfitGameState> {
  gameEngine: any | null;
  exerciseScheme: ExerciseScheme;
  entities: GameEntities;
  sensorData: Record<string, number[]>;
  interval: any;
  constructor(props: any) {
    super(props);
    this.gameEngine = null;
    this.exerciseScheme = this.props.exercise;
    // Initialize the game entities
    this.entities = spawnEntities(this.exerciseScheme);
    // Initialize empty sensor data
    this.sensorData = reduce(
      SENSOR_SERVICE.characteristics,
      (prev, curr) => {
        prev[curr] = [];
        return prev;
      },
      {} as Record<string, number[]>,
    );
    this.interval = null;
    // Initialize the state
    this.state = {
      running: true,
      gameOver: false,
      score: 0,
      gameOverDialogVisible: false,
      sessionData: {},
    };
  }

  /**
   * Function for opening/closing the menu
   */
  toggleMenuDialog() {
    this.setState({...this.state, running: !this.state.running});
  }

  /**
   * Function for opening/closing the game over dialog
   */
  toggleGameOverDialog() {
    this.setState({
      ...this.state,
      gameOverDialogVisible: !this.state.gameOverDialogVisible,
    });
  }

  /**
   * Handles notification updates from the femfit sensor
   * @param param0 the update data
   * @see {@link PeripheralNotification}
   */
  handlePeripheralUpdate({characteristic, value}: PeripheralNotification) {
    if (characteristic in this.sensorData) {
      set(this.sensorData, characteristic, value);
    }
  }

  /**
   * Logic executed when component is mounted
   */
  componentDidMount(): void {
    // Hide the navigation bar
    SystemNavigationBar.navigationHide();
    this.props.navigation.setOptions({headerShown: false});
    // Reset the entities
    this.gameEngine.swap(spawnEntities(this.exerciseScheme));
    this.gameEngine.dispatch({type: 'reset'});
    // Initialize listeners for the sensor
    if (this.props.device && this.props.device.state === 'connected') {
      addServiceListener(this.props.device.id, SENSOR_SERVICE);
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (data: PeripheralNotification) => this.handlePeripheralUpdate(data),
      );
      // Start interval for reading the sensor data
      this.interval = setInterval(() => {
        const {pressures, temperatures} = readSensorBytes(
          Object.values(this.sensorData),
        );
        const ts = Date.now();
        // Update the state with new session data
        this.setState({
          ...this.state,
          sessionData: {
            ...this.state.sessionData,
            [ts]: [...pressures, ...temperatures],
          },
        });
        const pctMax = round(pressurePercent(max(pressures) as number), 1);
        // Move the character if the pressure is above threshold
        if (pctMax > ACTIVATION_THRESHOLD) {
          this.gameEngine.dispatch({type: 'move_up', value: pctMax});
        }
      }, UPDATE_INTERVAL_MS);
    }
  }

  /**
   * Logic executed when the component dismounts
   */
  componentWillUnmount(): void {
    // Show the navigation bar
    SystemNavigationBar.navigationShow();
    this.props.navigation.setOptions({headerShown: true});
    // Clear the update interval
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    // Unsubscribe the bluetooth listeners
    removeServiceListener(this.props.device.id, SENSOR_SERVICE);
    bleManagerEmitter.removeAllListeners(
      'BleManagerDidUpdateValueForCharacteristic',
    );
  }

  render(): ReactNode {
    return (
      <View style={styles.container}>
        <Image
          source={BackgroundImage}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Header
          score={this.state.score}
          toggle={() => this.toggleMenuDialog()}
        />
        <View style={styles.container}>
          <StatusBar hidden />
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            running={this.state.running}
            entities={this.entities}
            style={styles.gameContainer}
            onEvent={(event: any) => {
              switch (event.type) {
                case 'score':
                  this.setState({
                    ...this.state,
                    score: this.state.score + 1,
                  });
                  break;
                case 'game_over':
                  if (!this.state.gameOver) {
                    this.setState(
                      {
                        ...this.state,
                        running: false,
                        gameOver: true,
                      },
                      () => {
                        this.props.setSession({
                          sensor: 'femfit',
                          data: this.state.sessionData,
                        });
                        this.toggleGameOverDialog();
                      },
                    );
                  }
                  break;
              }
            }}
            systems={[Physics]}
          />
        </View>
        <MenuDialog
          visible={!this.state.running && !this.state.gameOver}
          onDismiss={() => this.toggleMenuDialog()}
          goBack={() => {
            this.props.clearAnswers();
            this.props.navigation.goBack();
          }}
        />
        <GameOverDialog
          score={this.state.score}
          exercise={this.exerciseScheme}
          visible={this.state.gameOverDialogVisible}
          onDismiss={() => this.toggleGameOverDialog()}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default connector(FemfitGame);
