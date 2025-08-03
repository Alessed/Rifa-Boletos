// Cargar datos de boletos ocupados y actualizar la vista
document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            updateTickets(data.occupied);
            updateLastUpdated(data.lastUpdated);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('tickets-grid').innerHTML = 
                '<div class="col-span-10 text-center text-red-500 p-4">Error cargando los datos. Intenta recargar la página.</div>';
        });
});

function updateTickets(occupiedTickets) {
    const allTickets = document.querySelectorAll('[id^="ticket-"]');
    let availableCount = 100;
    
    allTickets.forEach(ticket => {
        const ticketNumber = parseInt(ticket.id.split('-')[1]);
        
        if (occupiedTickets.includes(ticketNumber)) {
            ticket.className = 'ticket flex items-center justify-center h-12 border-2 rounded-lg font-medium text-lg ' +
                              'bg-red-100 border-red-300 text-red-800';
            availableCount--;
        } else {
            ticket.className = 'ticket flex items-center justify-center h-12 border-2 rounded-lg font-medium text-lg ' +
                              'bg-green-100 border-green-300 text-green-800';
        }
    });
    
    document.getElementById('available-count').textContent = availableCount;
    document.getElementById('occupied-count').textContent = 100 - availableCount;
}

function updateLastUpdated(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const formattedDate = new Date(dateString).toLocaleDateString('es-ES', options);
    document.getElementById('last-update').textContent = formattedDate;
}