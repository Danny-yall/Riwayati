// Import Supabase Client via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// TODO: Replace these with your actual Supabase URL and Publishable API Key
const SUPABASE_URL = 'https://pwoaqqhfloivjazdext.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_QmgZ32IJvOq3_Wv-6UFAVg_bdCdpkL7';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Default fallback novel if database is empty
const defaultNovels = [
    {
        id: "1",
        title: "The Silent Cosmos",
        author: "Aria Sterling",
        genre: "Sci-Fi",
        cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600",
        pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        desc: "An exploration of deep space stations and the ancient alien artifacts discovered on the outer rim of the galaxy."
    }
];

async function initDatabase() {
    try {
        const { data, error } = await supabase.from('novels').select('*');
        if (!error && (!data || data.length === 0)) {
            await supabase.from('novels').insert(defaultNovels);
        }
    } catch (e) {
        console.error("Database initialization error:", e);
    }
}

async function getNovels() {
    try {
        const { data, error } = await supabase.from('novels').select('*');
        if (error) throw error;
        // Return latest items first
        return data ? data.reverse() : [];
    } catch (e) {
        console.error('Error fetching novels:', e.message);
        return [];
    }
}

async function saveNovel(novel) {
    try {
        if (!novel.id) {
            novel.id = Date.now().toString();
        }
        const { error } = await supabase.from('novels').upsert([novel]);
        if (error) throw error;
        return true;
    } catch (e) {
        alert("Error saving novel to Supabase: " + e.message);
        return false;
    }
}

async function removeNovel(id) {
    try {
        const { error } = await supabase.from('novels').delete().eq('id', id.toString());
        if (error) throw error;
    } catch (e) {
        console.error('Error deleting novel:', e.message);
    }
}

// Attach functions globally so your HTML pages can call them
window.initDatabase = initDatabase;
window.getNovels = getNovels;
window.saveNovel = saveNovel;
window.removeNovel = removeNovel;
