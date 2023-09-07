import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Divider, Modal, Portal, Title} from 'react-native-paper';

export type PopupProps = React.ComponentProps<typeof Modal> & {
  title: string;
  actions?: React.ComponentProps<typeof Card.Actions>['children'];
};

/**
 * Generic component for rendering a modal popup.
 * @param props the props
 * @see {@link PopupProps}
 */
const Popup: React.FC<PopupProps> = ({contentContainerStyle, ...props}) => {
  return (
    <Portal>
      <Modal
        {...props}
        contentContainerStyle={[styles.container, contentContainerStyle]}>
        <Card>
          <Card.Content>
            <Title style={styles.title}>{props.title}</Title>
            <Divider style={styles.divider} />
            {props.children}
            {props.actions && (
              <Card.Actions style={styles.actions}>
                {props.actions}
              </Card.Actions>
            )}
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    minWidth: 250,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 8,
  },
  actions: {
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 0,
  },
});

export default Popup;
