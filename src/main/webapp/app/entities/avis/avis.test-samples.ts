import dayjs from 'dayjs/esm';

import { IAvis, NewAvis } from './avis.model';

export const sampleWithRequiredData: IAvis = {
  id: 51168,
};

export const sampleWithPartialData: IAvis = {
  id: 67678,
};

export const sampleWithFullData: IAvis = {
  id: 61652,
  note: 2,
  commentaire: 'Lilangeni',
  date: dayjs('2023-11-10T04:01'),
};

export const sampleWithNewData: NewAvis = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
