const express = require("express");
const app = express();
const PORT = 5500;

app.use(express.json());

// Liste des tâches avec 4 descriptions par défaut
let tasks = [
    { id: 1, description: "Faire des courses" },
    { id: 2, description: "Faire les devoirs ensemble" },
    { id: 3, description: "Reviser nos projets" },
    { id: 4, description: "Preparer à deux" }
];

let idCounter = tasks.length + 1; // ✅ Correction ici

// Lire toutes les descriptions des tâches
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Récupérer une tâche spécifique par ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(task);
});

// Ajouter une nouvelle tâche (description uniquement)
app.post("/tasks", (req, res) => {
    const { description } = req.body;
    if (!description) return res.status(400).json({ message: "La description est obligatoire" });

    const newTask = { id: idCounter++, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Modifier une tâche existante
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Tâche non retrouvée" });

    task.description = req.body.description || task.description;
    res.json(task);
});

// Supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: "Tâche supprimée avec succès" });
});

// Lancer le serveur
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
