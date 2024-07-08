async function getOSRSStats(username) {
    const response = await fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${username}`);
    
    if (!response.ok) {
        throw new Error('Player not found or API is down!');
    }

    const data = await response.text();
    const lines = data.split('\n');
    
    const skills = [
        'Overall', 'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer', 'Magic',
        'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing',
        'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecraft',
        'Hunter', 'Construction'
    ];

    const activities = [
        'League Points', 'Bounty Hunter - Hunter', 'Bounty Hunter - Rogue', 'Clue Scrolls (all)',
        'Clue Scrolls (beginner)', 'Clue Scrolls (easy)', 'Clue Scrolls (medium)', 'Clue Scrolls (hard)',
        'Clue Scrolls (elite)', 'Clue Scrolls (master)', 'LMS - Rank', 'Soul Wars Zeal', 'Rifts closed'
    ];

    let output = `**OSRS Stats for ${username}**\n\n`;

    output += "**Skills:**\n";
    skills.forEach((skill, index) => {
        const [rank, level, xp] = lines[index].split(',').map(Number);
        output += `${skill}: Level ${level} | XP: ${xp.toLocaleString()} | Rank: ${rank.toLocaleString()}\n`;
    });

    output += "\n**Activities:**\n";
    activities.forEach((activity, index) => {
        const [rank, score] = lines[index + skills.length].split(',').map(Number);
        if (rank !== -1 && score !== -1) {
            output += `${activity}: Score: ${score.toLocaleString()} | Rank: ${rank.toLocaleString()}\n`;
        }
    });

    return output;
}



module.exports = {
    getOSRSStats
  };
  