import { colors } from "@wearto-you/ui";
import { useMemo, useRef, useState } from "react";
import { Animated, Modal, PanResponder, Pressable, StyleSheet, View } from "react-native";
import { CloseIcon } from "./icons/icons";

const ZOOM_SCALE = 2.5;
const TAP_MOVE_THRESHOLD = 4;

/** Full-screen click-to-zoom viewer: tap the image to zoom in/out, drag to pan while zoomed. */
export function ImageZoomModal({
  visible,
  imageUri,
  alt,
  onClose,
}: {
  visible: boolean;
  imageUri: string;
  alt?: string;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panOffset = useRef({ x: 0, y: 0 });
  const movedPastThreshold = useRef(false);

  const resetPan = () => {
    panOffset.current = { x: 0, y: 0 };
    pan.setValue({ x: 0, y: 0 });
  };

  // One responder handles both gestures — tap to toggle zoom, drag to pan
  // while zoomed — instead of a separate Pressable, since nesting a
  // Pressable's onPress alongside a PanResponder fires both on release
  // (they don't coordinate on web), toggling zoom back off after a drag.
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          movedPastThreshold.current = false;
          pan.setOffset(panOffset.current);
          pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (evt, gesture) => {
          if (Math.abs(gesture.dx) > TAP_MOVE_THRESHOLD || Math.abs(gesture.dy) > TAP_MOVE_THRESHOLD) {
            movedPastThreshold.current = true;
          }
          if (zoomed) Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false })(evt, gesture);
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
          // @ts-expect-error - Animated.ValueXY stores current value on the private _value field; no public getter exists.
          panOffset.current = { x: pan.x._value, y: pan.y._value };
          if (!movedPastThreshold.current) {
            if (zoomed) {
              resetPan();
              setZoomed(false);
            } else {
              setZoomed(true);
            }
          }
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [zoomed]
  );

  const close = () => {
    resetPan();
    setZoomed(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.backdrop}>
        <Pressable onPress={close} style={styles.closeBtn} accessibilityLabel="Close zoomed photo" hitSlop={10}>
          <CloseIcon size={18} color={colors.surface} />
        </Pressable>
        <View style={styles.imageWrap} {...panResponder.panHandlers}>
          <Animated.Image
            source={{ uri: imageUri }}
            accessibilityLabel={alt}
            style={[
              styles.image,
              {
                resizeMode: "contain",
                transform: [{ scale: zoomed ? ZOOM_SCALE : 1 }, { translateX: pan.x }, { translateY: pan.y }],
              },
            ]}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(20,16,14,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "90%",
    height: "80%",
  },
});
