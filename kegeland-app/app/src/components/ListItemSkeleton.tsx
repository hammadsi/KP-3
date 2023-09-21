import React from 'react';
import {StyleSheet, View} from 'react-native';

import Skeleton from './Skeleton';

/**
 * Skeleton component for ListItem.
 * @see {@link Skeleton}
 */
const ListItemSkeleton: React.FC = () => {
  return (
    <View style={styles.skeleton}>
      <Skeleton mode="rounded" width={22} height={22} />
      <Skeleton style={styles.skeletonText} height={22} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    marginVertical: 8,
    padding: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  skeletonText: {
    flex: 1,
    marginLeft: 8,
  },
});

export default ListItemSkeleton;
