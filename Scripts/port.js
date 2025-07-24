const characters = [
    {
        name: "Eren Yeager",
        image: "https://i.pinimg.com/736x/a3/92/2c/a3922c432494e8836b1e11e9722c7115.jpg",
        description: "Un joven decidido a liberar a la humanidad de los Titanes. Su evolución como personaje lo convierte en uno de los más complejos del anime moderno.",
        quote: "¡Pelearé hasta el último aliento!"
    },
    {
        name: "Yuji Itadori",
        image: "https://i.pinimg.com/736x/0e/e8/b2/0ee8b27665325c88ea23e22be2308865.jpg",
        description: "Un estudiante que ingiere un objeto maldito y se convierte en recipiente de Sukuna. A pesar de ello, lucha por salvar a otros mientras enfrenta sus propias dificultades.",
        quote: "¡No quiero que nadie más muera!"
    },
    {
        name: "Loid Forger",
        image: "https://i.pinimg.com/736x/7a/e3/25/7ae3252e5496a851c768f648c519a9ea.jpg",
        description: "Un espía en una misión para salvar el mundo. Forma una familia falsa con Yor y Anya, creando momentos cómicos y conmovedores.",
        quote: "La paz mundial depende de esta misión."
    },
    {
        name: "Bojji",
        image: "https://i.pinimg.com/736x/10/a9/98/10a9987dcd5e1a18d26f31e42a27f91a.jpg",
        description: "Un príncipe sordo que aspira a convertirse en un rey digno. Su bondad y determinación lo convierten en un personaje inspirador.",
        quote: "¡No importa lo difícil que sea, yo lo lograré!"
    },
    {
        name: "Tanjiro Kamado",
        image: "https://i.pinimg.com/1200x/2e/6c/6f/2e6c6f231ab099da36db20653c05477c.jpg",
        description: "Un cazador de demonios que lucha para salvar a su hermana Nezuko y proteger a otros. Su empatía incluso hacia sus enemigos lo hace único.",
        quote: "¡No dejaré que nadie más sufra como nosotros!"
    },
    {
        name: "Anya Forger",
        image: "https://i.pinimg.com/736x/ca/57/0f/ca570f250ac280c5e0d1eb1c0c9a1454.jpg",
        description: "Una niña con poderes psíquicos que forma parte de la familia falsa de Loid. Su personalidad adorable y traviesa la hace destacar.",
        quote: "¡Anya es muy inteligente!"
    },
    {
        name: "Asta",
        image: "https://i.pinimg.com/736x/c8/c2/61/c8c2615d5b2db78536fd8be29541926e.jpg",
        description: "Un joven sin poderes mágicos que sueña con convertirse en el Rey Mago. Su determinación y fuerza lo llevan a superar sus límites.",
        quote: "¡No me rendiré nunca!"
    },
    {
        name: "Chisato Nishikigi",
        image: "https://i.pinimg.com/736x/ee/74/e2/ee74e23adc83e05c092d980f77b361a3.jpg",
        description: "Una agente especial con habilidades excepcionales que protege a la sociedad mientras crea vínculos profundos con sus compañeros.",
        quote: "¡La vida es demasiado preciosa para desperdiciarla!"
    },
    {
        name: "Rudeus Greyrat",
        image: "https://i.pinimg.com/736x/61/b0/e2/61b0e299dc8bdcdda6cfc7e4330e5851.jpg",
        description: "Un hombre reencarnado en un mundo mágico que busca redimirse y vivir una vida mejor. Su crecimiento personal es el núcleo de la serie.",
        quote: "¡Usaré esta segunda oportunidad al máximo!"
    },
    {
        name: "Marin Kitagawa",
        image: "https://i.pinimg.com/736x/1b/a8/81/1ba8810486444b8d628ecc87bef16974.jpg",
        description: "Una chica extrovertida apasionada por el cosplay que inspira a otros con su entusiasmo y confianza.",
        quote: "¡Haz lo que amas sin importar lo que digan!"
    }
];

// Generar tarjetas dinámicamente
const characterList = document.getElementById("character-list");

characters.forEach(character => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    card.innerHTML = `
        <img class="character-image" src="${character.image}" alt="${character.name}">
        <div class="character-info">
            <div class="character-name">${character.name}</div>
            <div class="character-description">${character.description}</div>
            <div class="character-quote">"${character.quote}"</div>
        </div>
    `;

    characterList.appendChild(card);
});