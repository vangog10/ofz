import { create } from 'zustand';
import { sendApplication } from '../api/form.api';
import { toAttachments } from '../utils/files';
import type { FormField, FormPayload, FormValues } from '../interfaces/form.interface';
import type { SubmitStatus } from '../interfaces/primitives.type';

const emptyValues: FormValues = {
  name: '',
  organization: '',
  email: '',
  phone: '',
  task: '',
};

export interface FormStore {
  values: FormValues,
  consent: boolean,
  files: File[],
  status: SubmitStatus,
  error: string | null,
  payload: FormPayload | null,
  setField: (field: FormField, value: string) => void,
  setConsent: (consent: boolean) => void,
  setFiles: (files: File[]) => void,
  reset: () => void,
  dismiss: () => void,
  submit: () => Promise<boolean>
}

const useFormStore = create<FormStore>((set, get) => ({
  values: emptyValues,
  consent: false,
  files: [],
  status: 'idle',
  error: null,
  payload: null,

  setField: (field, value) => set((state) => ({ values: { ...state.values, [field]: value } })),
  setConsent: (consent) => set({ consent }),
  setFiles: (files) => set({ files }),

  reset: () => set({ values: emptyValues, consent: false, files: [], status: 'idle', error: null, payload: null }),
  dismiss: () => set({ status: 'idle', error: null }),

  submit: async () => {
    const { values, consent, files } = get();

    set({ status: 'pending', error: null });

    try {
      const attachments = await toAttachments(files);
      const payload: FormPayload = { ...values, consent, files: attachments };

      set({ payload });

      await sendApplication(payload);
      set({ status: 'success' });
      return true;
    } catch (error) {
      set({
        status: 'error',
        error: error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте ещё раз',
      });
      return false;
    }
  },
}));

export default useFormStore;
