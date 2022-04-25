import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL } from './const';

export const supabase = createClient(SUPABASE_URL,
    process.env.REACT_APP_ANON_KEY, {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_KEY}`
    }
})

export const getGames = async (setArray, {limit, filter, name}) => {
    let query = supabase.from("steam").select("*");

    if (name != null) query = query.ilike('title', `%${name}%`);
    if (filter !== null) query = query.order(filter, { ascending: true });
    query = query.range(limit, limit + 4);

    const { data, error } = await query;

    if (error)
        console.error('Error fetching steam');
    else if (data && limit > 0)
        setArray(prev => [...prev, ...data]);
    else if (data)
        setArray(data);
}