import Card from '@/components/card';
import Title from '@/components/title';
import Input from '../../../../components/input';
import Select from '../../../../components/select/select';
import Button from '../../../../components/button';
import type { Address } from '../types';

interface AddressesCardProps {
    addresses: Address[];
    isReadOnly: boolean;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: keyof Address, value: string) => void;
}

export default function AddressesCard({ addresses, isReadOnly, onAdd, onRemove, onUpdate }: AddressesCardProps) {
    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <Title text="Addresses" />
                {!isReadOnly && (
                    <Button variant="secondary" onClick={onAdd}>
                        + Add Address
                    </Button>
                )}
            </div>
            {addresses.map((address, index) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Country *"
                        value={address.country}
                        onChange={(e) => onUpdate(index, 'country', e.target.value)}
                        disabled={isReadOnly}
                        required
                    />
                    <Input
                        label="City *"
                        value={address.city}
                        onChange={(e) => onUpdate(index, 'city', e.target.value)}
                        disabled={isReadOnly}
                        required
                    />
                    <Input
                        label="Street *"
                        value={address.street}
                        onChange={(e) => onUpdate(index, 'street', e.target.value)}
                        disabled={isReadOnly}
                        required
                    />
                    <Input
                        label="Postal Code"
                        value={address.postalCode}
                        onChange={(e) => onUpdate(index, 'postalCode', e.target.value)}
                        disabled={isReadOnly}
                    />
                    <Select
                        label="Type *"
                        value={address.type}
                        onChange={(e) => onUpdate(index, 'type', e.target.value as 'Mailing' | 'Work')}
                        options={[
                            { value: 'Mailing', label: 'Mailing' },
                            { value: 'Work', label: 'Work' },
                        ]}
                        disabled={isReadOnly}
                        required
                    />
                    {!isReadOnly && addresses.length > 1 && (
                        <div className="flex items-end">
                            <Button variant="secondary" onClick={() => onRemove(index)}>
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            ))}
        </Card>
    );
}
