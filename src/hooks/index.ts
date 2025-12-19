// Animation hooks
export { useTimer } from './useTimer';
export { useModalAnimation, useTabAnimation, useSlideAnimation } from './useGsapAnimation';

// Asset loading hooks
export { useAssetPreload } from './useAssetPreload';
export type { AssetPreloadState } from './useAssetPreload';

// Simplified state hooks (recommended for most use cases)
export { usePlayer } from './usePlayer';
export type { UsePlayerReturn } from './usePlayer';

export { useEvent, useActiveEvents, useAllEvents } from './useEvent';
export type { UseEventReturn } from './useEvent';

export { useModal, useModalParams, useIsModalOpen } from './useModal';
export type { UseModalReturn } from './useModal';
