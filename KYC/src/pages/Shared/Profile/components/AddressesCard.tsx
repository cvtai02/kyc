import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import type { User } from '../types';

interface AddressesCardProps {
  address: User['address'];
  isReadOnly: boolean;
  onUpdate: (field: string, value: string | number) => void;
}

export default function AddressesCard({ address, isReadOnly, onUpdate }: AddressesCardProps) {
  return (
    <Card>
      <Title text="Address" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="Country *"
          value={address.country}
          onChange={(e) => onUpdate('country', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="State *"
          value={address.state}
          onChange={(e) => onUpdate('state', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="City *"
          value={address.city}
          onChange={(e) => onUpdate('city', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="Street Address *"
          value={address.address}
          onChange={(e) => onUpdate('address', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="Postal Code *"
          value={address.postalCode}
          onChange={(e) => onUpdate('postalCode', e.target.value)}
          disabled={isReadOnly}
          required
        />
        <Input
          label="State Code"
          value={address.stateCode}
          onChange={(e) => onUpdate('stateCode', e.target.value)}
          disabled={isReadOnly}
        />
      </div>
    </Card>
  );
}
