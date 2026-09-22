
then((res) => {

    const esewaData = res.data.data.esewa;
    esewaForm.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2/form");
    esewaForm.setAttribute("method", "POST");

    Object.entries(esewaData).forEach(([Key, value]) => {
        const input = document.createElement('input')
        input.setAttribute('type',"hidden")
        input.setAttribute('name', "key")
        input.setAttribute('value', value)
        esewaForm.appendChild(input)
    })

    document.body.appendChild(esewaForm)
    esewaForm.submit()
})
