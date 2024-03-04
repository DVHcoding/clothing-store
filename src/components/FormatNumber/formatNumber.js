//  Function: format number to be money 
export const formatNumber = (price) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(price);
}

