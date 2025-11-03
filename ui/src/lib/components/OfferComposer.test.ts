import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import OfferComposer from './OfferComposer.svelte';

describe('OfferComposer', () => {
  it('emits compose with selected ids', async () => {
    const component = render(OfferComposer, {
      missions: [{ id: 'm1', title: 'Mission 1' }],
      services: [{ id: 's1', title: 'Service 1' }],
      assets: [{ id: 'a1', title: 'Asset 1' }]
    });
    const handler = vi.fn();
    component.component.$on('compose', handler);

    await fireEvent.change(component.getByLabelText('Mission'), { target: { value: 'm1' } });
    await fireEvent.change(component.getByLabelText('Services'), { target: { options: [{ selected: true, value: 's1' }] } });
    await fireEvent.change(component.getByLabelText('Assets'), { target: { options: [{ selected: true, value: 'a1' }] } });
    await fireEvent.click(component.getByText('Composer l’offre'));

    expect(handler).toHaveBeenCalled();
  });
});
