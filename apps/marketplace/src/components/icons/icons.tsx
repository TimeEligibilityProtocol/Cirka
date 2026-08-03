import Svg, { Circle, Path, Rect } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const DEFAULT_SIZE = 20;
const DEFAULT_STROKE = 1.7;

function base(size: number | undefined) {
  return size ?? DEFAULT_SIZE;
}

export function HeartIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE, filled = false }: IconProps & { filled?: boolean }) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20.5c-.3 0-.6-.1-.8-.3C8.4 17.9 3 13.7 3 9.1 3 6.3 5.2 4 8 4c1.6 0 3.1.8 4 2 .9-1.2 2.4-2 4-2 2.8 0 5 2.3 5 5.1 0 4.6-5.4 8.8-8.2 11.1-.2.2-.5.3-.8.3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </Svg>
  );
}

export function ChatIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-1.9-.1-2.8-.4L5 21l1.4-3.9C4.9 15.8 4 14 4 12Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ProfileIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.6" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M4.8 20c1.1-3.4 4-5.4 7.2-5.4s6.1 2 7.2 5.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Circle cx="10.8" cy="10.8" r="6.3" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M19.5 19.5l-4-4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function HomeIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9.5h12V10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlusIcon({ size, color = "currentColor", strokeWidth = 2 }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function TruckIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Rect x="2.5" y="7" width="11" height="9" rx="1" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M13.5 10h3.6L20 12.7V16h-6.5V10Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Circle cx="7" cy="18" r="1.6" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="16.5" cy="18" r="1.6" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function PickupIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21c4-4 6.5-7.4 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 13.6 8 17 12 21Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="10.3" r="2.2" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function CardIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Rect x="2.5" y="5.5" width="19" height="13" rx="1.8" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M2.5 9.5h19" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M5.5 14.5h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function AppleIcon({ size, color = "currentColor" }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.2 12.5c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.3-.1-2.6.8-3.2.8-.7 0-1.7-.8-2.9-.8-1.5 0-2.9.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.6-.9.8-1.3 1.3-2.3-3.4-1.3-2.7-3.4-2.7-3.8Z"
        fill={color}
      />
      <Path
        d="M13.9 5.9c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
        fill={color}
      />
    </Svg>
  );
}

export function ShieldIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3.5 19 6v5.5c0 4.6-3 7.6-7 9-4-1.4-7-4.4-7-9V6l7-2.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path d="M9 12.2l2 2 4-4.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LeafIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 19c8.5 0 14-5.5 14-14 0 0-11.5-1-14 8-1 3.5 0 6 0 6Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path d="M5 19c0-3 1.5-6.5 4.5-9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CommunityIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Circle cx="8.5" cy="8" r="2.8" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="16" cy="9" r="2.2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M3.2 19c.7-3 3-4.8 5.3-4.8s4.6 1.8 5.3 4.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14.8 14.6c2.1.2 4 1.9 4.6 4.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function LockIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="10.5" width="14" height="9.5" rx="1.8" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx="12" cy="14.8" r="1.3" fill={color} />
    </Svg>
  );
}

export function DressIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3.5v2.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path
        d="M9.5 5.7 12 7.5l2.5-1.8 2 2.4-2 1.8 2.3 9.9H7.2l2.3-9.9-2-1.8 2-2.4Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShoeIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 16.5c0-2.3.4-4 2-5.4 1-.9 1.7-1.7 2-2.6.3.7 1 1.2 1.8 1.2h1.4c.5 0 .9.3 1.1.7l.6 1.3c.3.6.9 1 1.6 1H21c.3 1 .3 2.1 0 3.8-.1.6-.6 1-1.2 1H4c-.6 0-1-.4-1-1Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BagIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M7.5 9V7a4.5 4.5 0 0 1 9 0v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Rect x="4.5" y="9" width="15" height="11.5" rx="1.8" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </Svg>
  );
}

export function AccessoryIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Circle cx="6.5" cy="15" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="17.5" cy="15" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M9.5 14h5M4 12.5l1.5-6h13l1.5 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function AllCategoriesIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Rect x="3.5" y="3.5" width="7" height="7" rx="1.4" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="13.5" y="3.5" width="7" height="7" rx="1.4" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="3.5" y="13.5" width="7" height="7" rx="1.4" stroke={color} strokeWidth={strokeWidth} />
      <Rect x="13.5" y="13.5" width="7" height="7" rx="1.4" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function ChevronRightIcon({ size, color = "currentColor", strokeWidth = DEFAULT_STROKE }: IconProps) {
  const s = base(size);
  return (
    <Svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <Path d="M9 5.5 15.5 12 9 18.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
