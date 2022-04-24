import { createClient } from '@supabase/supabase-js'

const supabase_url = "https://gqkuommdmfzmwkzdewma.supabase.co";

export const supabase = createClient(supabase_url,
    process.env.REACT_APP_ANON_KEY, {
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_KEY}`
    }
})

export const getGames = async (setArray, limit, filter) => {
    let query = supabase.from("steam").select("*").range(limit, limit + 4);
    if (filter !== null) {
        query = query.order(filter, { ascending: true });
    }

    console.log("Query = ", query);

    const { data, error } = await query;
    console.log(data);

    if (error)
        console.error('Error fetching steam', error);
    else if (data && limit > 0)
        setArray(prev => [...prev, ...data]);
    else if (data)
        setArray(data);
}