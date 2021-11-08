const activities = [
    { type: 'PLAYING',  message: 'à faire un PENTAKILL'  },
    { type: 'PLAYING',  message: 'me faire coder'  },
    { type: 'WATCHING', message: 'JavaScript >>> Python' },
    { type: 'WATCHING', message: 'Get Jinxed' },
];

const statut_choix = [
    'idle',
    'dnd',
    'online'
];

function bio() {
    return activities[Math.floor(Math.random() * (activities.length - 1) + 1)];
}

function status(){
    return statut_choix[Math.floor(Math.random() * (statut_choix.length - 1) + 1)];
}

module.exports = { bio, status }