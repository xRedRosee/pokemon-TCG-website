const returnToSeriesBtn =  document.querySelector('.return-series-btn');
const returnToSetsBtn =  document.querySelector('.return-sets-btn');
const returnToCardsBtn =  document.querySelector('.return-cards-btn');

// show series from json
function showSeries(){
    // fetch sets from JSON
    fetch('pokemontcg.json')
    .then(res => res.json()).then(jsonData=>{
        const dataSeries = jsonData.allseries;

        // show sets in HTML
        document.querySelector('.series').innerHTML = dataSeries.reduce((html, dataseries)=> html+= 
        `<li class="series-card">
        <button class="series-btn" onclick="showSets('${dataseries.serie}')">
        <img src="${dataseries.img}" alt="${dataseries.serie} image" class="series-card-img">
        </button>
        </li>`, '')

        // return buttons not visible
        returnToSeriesBtn.style.display = 'none';
        returnToSetsBtn.style.display = 'none';
        returnToCardsBtn.style.display = 'none';
        return;
    });
}
showSeries()

// show sets from chosen series from json
function showSets(selseries){
    const selectedSeries = selseries;

    fetch('pokemontcg.json')
    .then(res => res.json()).then(jsonData=>{
        const dataSets = jsonData.sets;

        // loop through every cardset
        dataSets.forEach(cardset => {
            // check if this cardset is part of the series
            if(cardset.series == selectedSeries){
                // display the sets in the html
                document.querySelector('.sets').innerHTML +=
                `<li class="sets-card">
                <button class="sets-btn" onclick="showCardsList('${cardset.setID}')">
                <img src="${cardset.img}" alt="${cardset.setName} image" class="sets-card-img">
                </button>
                </li>`

                // make the series not visible
                // document.querySelector('.series').style.display = 'none';
                document.querySelector('.series').innerHTML = ''
                
                // return to series button visible
                returnToSeriesBtn.style.display = 'flex';
                returnToSetsBtn.style.display = 'none';
                returnToCardsBtn.style.display = 'none';

                // return to series
                returnToSeriesBtn.addEventListener('click', function(){
                    document.querySelector('.sets').innerHTML = '';
                
                    document.querySelector('.series').style.display = 'flex';
                    showSeries()
                })

                return;
            }
        })
    })
}

// show cards list from chosen set
function showCardsList(setID){
    const setlist = setID;

    console.log(setlist);

    fetch('pokemontcg.json')
    .then(res => res.json()).then(jsonData=>{
        const dataSets = jsonData.sets;
        const cardList = dataSets[0].cardList;
        
        cardList.forEach(card => {
            
            document.querySelector('.cards').innerHTML +=
            `<li class="tcg-card">
            <button class="tcg-card-btn" onclick="showCardData('${card.pokemonName}')">
                <figure class="tcg-leftside">
                    <figcaption class="tcg-card-name"><h2 class="tcg-card-name">${card.cardID} - ${card.pokemonName}</h2></figcaption>
                    <img src="${card.img}" alt="${card.pokemonName} image" class="tcg-card-img">
                </figure>
            </button>
            </li>`
            
            // make the sets and series not visible
            document.querySelector('.sets').style.display = 'none';
            document.querySelector('.series').style.display = 'none';

            // return to sets button visible
            returnToSeriesBtn.style.display = 'none';
            returnToSetsBtn.style.display = 'flex';
            returnToCardsBtn.style.display = 'none';

            // return to series
            returnToSetsBtn.addEventListener('click', function(){
            const selectedSeries = card.series;
            console.log(selectedSeries);

            document.querySelector('.cards').innerHTML = '';

            document.querySelector('.sets').style.display = 'flex';
            showSets(selectedSeries)

            returnToSeriesBtn.style.display = 'flex';
            returnToSetsBtn.style.display = 'none';
            returnToCardsBtn.style.display = 'none';
            })
        });
    })
}


// show data from the selected card from the card list
function showCardData(selcard){
    const selectedCard = selcard;

    fetch('pokemontcg.json')
    .then(res => res.json()).then(jsonData=>{
        const dataCards = jsonData.sets;
        const cardlist = dataCards[0].cardList;

        // loop through every card
        cardlist.forEach(card => {
            // check if this card is the selected card
            if(card.pokemonName == selectedCard){
                // display the card in the html
                document.querySelector('.card-info').innerHTML +=
                `<figure class="card-general">
                    <figcaption class="card-name"><h1 class="card-name"> ${card.pokemonName} </h1></figcaption>
                    <img src="${card.img}" alt="${card.pokemonName} image" class="card-img">
                </figure>
                <article class="card-information">
                <h2 class="card-number"> Card number: ${card.cardID}</h2>
                <p class="card-rarity"> Rarity: ${card.rarity} </p>
                <h2> Value past months </h2>
                <div>
                <canvas id="valuechart">
                </div>
                </article>
                `
            // create chart for the value
            const ctx = document.getElementById('valuechart');
                new Chart(ctx, {
                        type: 'line',
                        data: {
                        labels: ["January", "February", "March", "April", "May"],
                        datasets: [{
                            label: 'Euros',
                            data: card.value,
                            borderColor: '#a3dff0',
                        }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                     ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                });

                // make the cards list not visible
                document.querySelector('.cards').style.display = 'none';

                // return to card list
                returnToSeriesBtn.style.display = 'none';
                returnToSetsBtn.style.display = 'none';
                returnToCardsBtn.style.display = 'flex';

                
                // return to card list
                returnToCardsBtn.addEventListener('click', function(){
                    const selectedList = card.setID;
                    
                    document.querySelector('.card-info').innerHTML = '';
                    
                    document.querySelector('.cards').style.display = 'flex';
                    showCardsList(selectedList)
    
                    returnToSeriesBtn.style.display = 'none';
                    returnToSetsBtn.style.display = 'flex';
                    returnToCardsBtn.style.display = 'none';
                })
            }
        })
    })
}

