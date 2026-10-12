const STORAGE_KEY = 'novelsphere_shared_db';

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

function initDatabase() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNovels));
    }
}

function getNovels() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveNovel(novel) {
    try {
        const novels = getNovels();
        const existingIndex = novels.findIndex(n => n.id === novel.id);
        if (existingIndex >= 0) {
            novels[existingIndex] = novel;
        } else {
            novels.unshift(novel);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novels));
        return true;
    } catch (e) {
        alert("Storage limit exceeded! The PDF or image file is too large to save in browser storage. Please use a smaller file or a URL link instead.");
        return false;
    }
}

function removeNovel(id) {
    let novels = getNovels();
    novels = novels.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novels));
}