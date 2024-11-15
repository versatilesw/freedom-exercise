import React, { useEffect, useState } from 'react';
import API from '../api';

function LeadList() {
    const [leads, setLeads] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        const response = await API.get('/leads');
        setLeads(response.data.data);
    };

    const searchLeads = async () => {
        const response = await API.get(`/leads/search?query=${query}`);
        setLeads(response.data.data);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchLeads}>Search</button>
            <ul>
                {leads.map((lead) => (
                    <li key={lead.id}>{lead.name} - {lead.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default LeadList;
