export enum FilterEnum {
  SHOW_ALL = 'show_all',
  SHOW_COMPLETED = 'show_completed',
  SHOW_ACTIVE = 'show_active'
}

export const FILTER_TITLES = {
  [FilterEnum.SHOW_ALL]: 'All',
  [FilterEnum.SHOW_ACTIVE]: 'Active',
  [FilterEnum.SHOW_COMPLETED]: 'Completed',
};