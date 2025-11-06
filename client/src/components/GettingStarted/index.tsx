import React, { useEffect, useState } from 'react';
import { Section } from './components';
import Container from '../container';
import { addDonation, Donation, getAllDonations } from "../../api/donation-requests";

export const LandingBrief = () => {

    const [amount, setAmount] = useState('');
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        getAllDonations().then(setDonations).catch(console.error);
    }, []);

    const handleAdd = async () => {
        const value = Number(amount);
        if (isNaN(value) || value <= 0) return;
        await addDonation({
            sender_public_key: '',
            amount_cspr: value,
            message: ''
        });
        setAmount('');
        const updated = await getAllDonations();
        setDonations(updated);
    };
  return (
    <Container>
      <h3>✨ Your donations</h3>
        <Section>
            <ul>
                {donations.map((d) => (
                    <li key={d.id}>{d.amount_cspr} CSPR</li>
                ))}
            </ul>
        </Section>
    </Container>
  );
};
