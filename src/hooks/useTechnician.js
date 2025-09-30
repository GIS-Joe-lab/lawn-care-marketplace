import {useCallback, useMemo, useEffect} from 'react';
import {ACTIONS, useApp} from '../context/AppContext';
import {Technicians} from "../constants/technicians";

export function useTechnician() {

    const {state, dispatch} = useApp();

    const minRating = useMemo(() => Math.min(...Technicians.map(t => t.rating)), []);
    const maxRating = useMemo(() => Math.max(...Technicians.map(t => t.rating)), []);
    const services = useMemo(() => [...new Set(Technicians.flatMap(technician => technician.services))].sort(), []);
    const topRatedTechnicians = useMemo(() => Technicians.filter(technician => technician.rating >= 4.8), []);

    const filteredTechnicians = useMemo(() => Technicians.filter(technician => {
        const matchesSearch = technician.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesService = !state.selectedService || technician.services.includes(state.selectedService);
        const matchesRating = technician.rating >= state.selectedMinRating;
        return matchesSearch && matchesService && matchesRating;
    }), [state.searchQuery, state.selectedService, state.selectedMinRating]);

    useEffect(() => {
        if (state.selectedMinRating === 0) {
            dispatch({type: ACTIONS.SET_SELECTED_MIN_RATING, payload: minRating});
        }
    }, [minRating, state.selectedMinRating, dispatch]);

    const hasTechnicians = filteredTechnicians.length > 0;
    const hasNoFilter = !state.searchQuery && !state.selectedService &&
        (state.selectedMinRating === 0 || state.selectedMinRating === minRating);

    const setSearchQuery = useCallback((query) =>
        dispatch({type: 'SET_SEARCH_QUERY', payload: query}), [dispatch])

    const setSelectedService = useCallback((service) =>
        dispatch({type: 'SET_SELECTED_SERVICE', payload: service}), [dispatch]);

    const setSelectedMinRating = useCallback((rating) =>
        dispatch({type: 'SET_SELECTED_MIN_RATING', payload: rating}), [dispatch]);

    const resetFilters = useCallback(() =>
        dispatch({type: 'RESET_FILTERS', payload: {minRating}}), [dispatch, minRating])

    return {
        searchQuery: state.searchQuery,
        selectedService: state.selectedService,
        selectedMinRating: state.selectedMinRating,
        minRating,
        maxRating,
        services,
        topRatedTechnicians,
        filteredTechnicians,
        hasTechnicians,
        hasNoFilter,
        setSearchQuery,
        setSelectedService,
        setSelectedMinRating,
        resetFilters
    };
}