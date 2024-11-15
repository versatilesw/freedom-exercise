import React, { useState, useEffect } from 'react';
import API from '../api';

function LeadForm({ selectedLead, onSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [leadStatusId, setLeadStatusId] = useState('');
    const [leadStatuses, setLeadStatuses] = useState([]);

    // Fetch lead statuses when the component mounts
    useEffect(() => {
        const fetchLeadStatuses = async () => {
            try {
                const response = await API.get('/lead-statuses');
                setLeadStatuses(response.data);
            } catch (error) {
                console.error('Error fetching lead statuses:', error);
            }
        };

        fetchLeadStatuses();

        // If editing, populate fields
        if (selectedLead) {
            setName(selectedLead.name);
            setEmail(selectedLead.email);
            setPhone(selectedLead.phone);
            setLeadStatusId(selectedLead.lead_status_id);
        }
    }, [selectedLead]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { name, email, phone, lead_status_id: leadStatusId };

            if (selectedLead) {
                await API.put(`/leads/${selectedLead.id}`, payload);
                alert('Lead updated successfully!');
            } else {
                await API.post('/leads', payload);
                alert('Lead created successfully!');
            }

            setName('');
            setEmail('');
            setPhone('');
            setLeadStatusId('');

            onSuccess();
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <select
                value={leadStatusId}
                onChange={(e) => setLeadStatusId(e.target.value)}
                required
            >
                <option value="">Select Lead Status</option>
                {leadStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                        {status.name}
                    </option>
                ))}
            </select>
            <button type="submit">{selectedLead ? 'Update Lead' : 'Add Lead'}</button>
        </form>
    );
}

export default LeadForm;
