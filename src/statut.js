const activities = [
    { type: 'PLAYING',  message: 'à faire un PENTAKILL'  },
    { type: 'PLAYING',  message: 'à me faire coder'  },
    { type: 'WATCHING', message: 'JavaScript >>> Python' },
    { type: 'WATCHING', message: 'Get Jinxed' },
    { type: 'LISTENING', message: 'Baahhh tu stalk'},
];

const statut_choix = [
    'idle',
    'dnd',
    'online'
];

export function bio() {
    return activities[Math.floor(Math.random() * (activities.length - 1) + 1)];
}

export function status(){
    return statut_choix[Math.floor(Math.random() * (statut_choix.length - 1) + 1)];
}
