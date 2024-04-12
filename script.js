const kerdesek = [
    {
      id: 0,
      kerdes: "Mi a fővárosa Magyarországnak?",
      valaszok: ["Budapest", "Bécs", "Berlin", "Róma"]
    },
    {
      id: 1,
      kerdes: "Melyik évben kezdődött az első világháború?",
      valaszok: ["1870", "1939", "1945", "1914"]
    },
    {
      id: 2,
      kerdes: "Mi a legnagyobb állat a Földön?",
      valaszok: ["Tigris", "Elefánt", "Kék Bálna", "Csimpánz"]
    },
    {
      id: 3,
      kerdes: "Melyik évben érte el az ember először a Holdat?",
      valaszok: ["1955", "1975", "1983", "1969"]
    },
    {
      id: 4,
      kerdes: "Melyik a világ legmagasabb hegycsúcsa?",
      valaszok: ["Mount Everest", "Kilimandzsáró", "Mont Blanc", "Aconcagua"]
    }
  ];
  let i = 0;
  let adottValaszok = [];
  let helyesValaszok = [0,3,2,3,0];
  let joValaszok = 0;
  let rosszValaszok = 0;
  let prev = $('<button>').html('Prev');
  let next = $('<button>').html('Next');
  let done = $('<button>').html('Stats');

$(() => {

    prev.addClass('prev')
    next.addClass('next')
    done.addClass('done')

    $(".gombok").append(prev,next,done);

    updateQuestion();

    prev.on('click',()=>{
        if(i>0){
            i--;
            updateQuestion();
        }
        next.removeClass('done');
      })

    next.on('click',()=>{
        if(i<kerdesek.length-1){
            i++;
            updateQuestion();
        }
        if(i == kerdesek.length-1){
            next.addClass('done');
        }
      })
    
    done.on('click',()=>{
        $('.kerdes').empty();
        for (let i = 0; i < kerdesek.length; i++) {
            $(".kerdes").append(`<p id="q-${i}">${kerdesek[i].kerdes}</p>`)
            if(adottValaszok[i] == helyesValaszok[i]){
                $(`#q-${i}`).append(" - Helyes")
                $(`#q-${i}`).addClass('zold');
                    joValaszok++;
            }
            else{
                $(`#q-${i}`).append(" - Rossz")
                $(`#q-${i}`).addClass('piros'); 
                rosszValaszok++;
            }
                     
        }
        if(joValaszok>0){
            $(".kerdes").append(`<p class="zold">Jó válaszok: ${joValaszok}<br></p>`)
        }
        if(rosszValaszok>0){ 
            $(".kerdes").append(`<p class="piros">Rossz válaszok: ${rosszValaszok}</p>`)
        }
        
        $("#prev").prop("disabled", true);
        $("#next").prop("disabled", true);    
        done.addClass('done')
        prev.addClass('done')
        next.addClass('done');

})
      
    $('.kerdes').on('change', 'input[type="checkbox"]', function(){
        adottValaszok[i] = parseInt($(this).val());
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });

});

function updateQuestion(){

    $('.kerdes').empty();

    if(i == kerdesek[i].id){
        $(".kerdes").append(`<h1>${kerdesek[i].kerdes}</h1>`)
    }

    for (let j = 0; j < 4; j++) {
        let checkbox = $('<input>').attr({
          type: 'checkbox',
          name: 'option',
          value: j,
          checked: adottValaszok[i] === j
        });
        let label = $('<label>').text(`  ${kerdesek[i].valaszok[j]}`).prepend(checkbox);
        $('.kerdes').append(label);
      }

      $('.kerdes').on('change', 'input[type="checkbox"]', function(){
        $('input[type="checkbox"]').not(this).prop('checked', false);
      });

    if (i == 0) {
        $("#prev").prop("disabled", true);
    } else {
        $("#prev").prop("disabled", false);
    }

    if (i == kerdesek.length - 1) {
        $("#next").prop("disabled", true);
        done.removeClass('done');
    } else {
        $("#next").prop("disabled", false);
        done.addClass('done');
    }
}