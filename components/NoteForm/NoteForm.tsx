import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { CreateNoteDto } from '@/types/note';
import css from './NoteForm.module.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Minimum 3 characters'),
  content: yup.string().optional().max(500, 'Maximum 500 characters').default(''),
  tag: yup.string().required('Tag is required'),
});

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: CreateNoteDto = {
  title: '',
  content: '',
  tag: '',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: CreateNoteDto) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="content">Content</label>
            <Field id="content" name="content" as="textarea" />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select">
              <option value="">Select tag</option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || isSubmitting}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}