import React, { useState, useEffect } from 'react';
import API from '../api';
import LeadForm from './LeadForm';

function LeadList() {
    const [leads, setLeads] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedLead, setSelectedLead] = useState(null);

    // Fetch leads (with or without search query)
    const fetchLeads = async (searchQuery = '') => {
        const response = await API.get(`/leads/search?query=${searchQuery}`);
        setLeads(response.data.data);
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchLeads();
    }, []);

    const handleSearch = () => {
        fetchLeads(query);
    };

    const handleEdit = (lead) => {
        setSelectedLead(lead);
    };

    const handleSuccess = () => {
        fetchLeads(); // Refresh the full lead list
        setSelectedLead(null);
    };

    return (
        <div>
            {/* Search Bar with Button */}
            <div style={{ marginBottom: '1em' }}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Lead Form (Add or Edit) */}
            <LeadForm selectedLead={selectedLead} onSuccess={handleSuccess} />

            {/* List of Leads */}
            <ul>
                {leads.map((lead) => (
                    <li key={lead.id}>
                        {lead.name} - {lead.email}
                        <button onClick={() => handleEdit(lead)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LeadList;
