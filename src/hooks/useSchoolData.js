import { useState, useEffect, useCallback } from 'react';
import { getSchools } from '../api/schools.api';
import { getSchoolSettings } from '../api/settings.api';

/**
 * Loads the (single) school record and its login-page display settings.
 */
export const useSchoolData = () => {
    const [school, setSchool] = useState(null);
    const [schoolSettings, setSchoolSettings] = useState([]);
    const [initializing, setInitializing] = useState(true);
    const [error, setError] = useState('');

    const loadSchoolData = useCallback(async () => {
        try {
            setInitializing(true);
            const schoolsData = await getSchools();
            if (schoolsData && schoolsData.length > 0) {
                const schoolData = schoolsData[0]; // Take the first/only school
                setSchool(schoolData);
                try {
                    const settings = await getSchoolSettings(schoolData.id);
                    console.log("school settings response:", settings);
                    if (settings) setSchoolSettings(settings);
                } catch (e) { /* settings not configured yet */ }
            } else {
                setError('No school data found.');
            }
        } catch (e) {
            setError('Connection failed.');
        } finally {
            setInitializing(false);
        }
    }, []);

    useEffect(() => { loadSchoolData(); }, [loadSchoolData]);

    return { school, schoolSettings, initializing, error };
};