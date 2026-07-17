import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getSchools,
    getSchool as getSchoolApi,
    createSchool as createSchoolApi,
    updateSchool as updateSchoolApi,
} from "../api/schools.api";

const useSchools = () => {
    const [schools, setSchools] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [processing, setProcessing] =
        useState(false);

    const [error, setError] =
        useState(null);

    const loadSchools =
        useCallback(async () => {
            setLoading(true);
            setError(null);

            try {
                const data =
                    await getSchools();

                setSchools(data || []);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }, []);

    useEffect(() => {
        loadSchools();
    }, [loadSchools]);

    const getSchool =
        useCallback(
            async (schoolId) => {
                try {
                    const existing =
                        schools.find(
                            (school) =>
                                school.id ===
                                schoolId
                        );

                    if (existing)
                        return existing;

                    return await getSchoolApi(
                        schoolId
                    );
                } catch (err) {
                    console.error(err);
                    setError(err);
                    throw err;
                }
            },
            [schools]
        );

    const createSchool =
        useCallback(
            async (payload) => {
                setProcessing(true);

                try {
                    const data =
                        await createSchoolApi(
                            payload
                        );

                    await loadSchools();

                    return data;
                } catch (err) {
                    console.error(err);
                    setError(err);
                    throw err;
                } finally {
                    setProcessing(false);
                }
            },
            [loadSchools]
        );

    const updateSchool =
        useCallback(
            async (
                schoolId,
                payload
            ) => {
                setProcessing(true);

                try {
                    const data =
                        await updateSchoolApi(
                            schoolId,
                            payload
                        );

                    await loadSchools();

                    return data;
                } catch (err) {
                    console.error(err);
                    setError(err);
                    throw err;
                } finally {
                    setProcessing(false);
                }
            },
            [loadSchools]
        );

    const deleteSchool =
        useCallback(
            async (schoolId) => {
                console.log(
                    "TO BE ADDED LATER",
                    schoolId
                );
            },
            []
        );

    return {
        schools,

        loading,
        processing,
        error,

        refresh:
            loadSchools,

        getSchool,

        createSchool,

        updateSchool,

        deleteSchool,
    };
};

export default useSchools;