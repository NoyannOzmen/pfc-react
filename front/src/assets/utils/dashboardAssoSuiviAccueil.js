    
const rows = document.querySelectorAll('.view');

rows.forEach(row => row.addEventListener('click', showDetails));

rows.forEach(row => {
    row.addEventListener("keydown", function(e) {
        if(e.keyCode==13){
            showDetails(row);
            }
        })
    });

function showDetails(e) {
    //* On click : row is e(vent).currentTarget ; On keydown : row is e(vent)
    let fold = (e.currentTarget) ? e.currentTarget : e;
    const foldNode = fold.nextSibling;
    foldNode.classList.toggle('hidden');
}