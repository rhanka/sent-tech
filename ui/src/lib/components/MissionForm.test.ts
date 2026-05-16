import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import MissionForm from './MissionForm.svelte';

describe('MissionForm', () => {
  it('dispatches submit event with payload', async () => {
    const onsubmit = vi.fn();
    const { getByText, getByLabelText } = render(MissionForm, { onsubmit });

    await fireEvent.input(getByLabelText('Titre'), { target: { value: 'Mission test' } });
    await fireEvent.input(getByLabelText('Contexte'), { target: { value: 'Contexte' } });
    await fireEvent.click(getByText('Ajouter'));

    expect(onsubmit).toHaveBeenCalledWith({ title: 'Mission test', context: 'Contexte' });
  });
});
