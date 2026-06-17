import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import OfferComposer from './OfferComposer.svelte';

describe('OfferComposer', () => {
  it('emits compose with selected ids', async () => {
    const oncompose = vi.fn();
    const { getByLabelText, getByRole, getByText } = render(OfferComposer, {
      missions: [{ id: 'm1', title: 'Mission 1' }],
      services: [{ id: 's1', title: 'Service 1' }],
      assets: [{ id: 'a1', title: 'Asset 1' }],
      oncompose
    });

    await fireEvent.change(getByLabelText('Mission'), { target: { value: 'm1' } });

    const servicesGroup = getByRole('group', { name: 'Services' });
    await fireEvent.click(servicesGroup.querySelector('.st-multiSelect__trigger') as HTMLButtonElement);
    await fireEvent.click(servicesGroup.querySelector('[role="option"]') as HTMLButtonElement);

    const assetsGroup = getByRole('group', { name: 'Assets' });
    await fireEvent.click(assetsGroup.querySelector('.st-multiSelect__trigger') as HTMLButtonElement);
    await fireEvent.click(assetsGroup.querySelector('[role="option"]') as HTMLButtonElement);

    await fireEvent.click(getByText('Composer l’offre'));

    expect(oncompose).toHaveBeenCalledWith({
      missionId: 'm1',
      serviceIds: ['s1'],
      assetIds: ['a1']
    });
  });
});
