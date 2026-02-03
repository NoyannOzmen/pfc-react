function GouvApi() {
  async function gouvApiCall(search: string) {
    const BASE_URL = 'https://api-adresse.data.gouv.fr/search/?q=';
    const searchParams = search
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\s\W]/g, '+');
    const url = BASE_URL + searchParams + '&limit=5';

    const res = await fetch(url);
    const foundAddresses = res.json();
    return foundAddresses;
  }

  async function handleKeyStroke() {
    const inputApi = document.getElementById('api-gouv') as HTMLInputElement;
    const addressContainer = document.getElementById('address-container') as HTMLDivElement;

    if (inputApi.value.length > 3) {
      const adresses = await gouvApiCall(inputApi.value);

      addressContainer.textContent = '';

      adresses.features.forEach((address: typeof adresses) => {
        const addressBox = document.createElement('div');
        addressBox.classList.add('text-sm', 'p-2', 'hover:bg-accents1', 'hover:text-fond');
        addressBox.role = 'listitem';

        addressBox.addEventListener('click', () => {
          formFiller(address);
          addressContainer.textContent = '';
        });
        const addressText = document.createElement('p');
        addressText.innerText = `${address.properties.label}`;

        addressBox.appendChild(addressText);
        addressContainer.appendChild(addressBox);
      });
    }
  }

  function formFiller(address: { properties: { name: string; city: string; postcode: string } }) {
    const inputStreet = document.getElementById('rue') as HTMLInputElement;
    inputStreet.value = address.properties.name;
    const inputCity = document.getElementById('commune') as HTMLInputElement;
    inputCity.value = address.properties.city;
    const inputZipCode = document.getElementById('code_postal') as HTMLInputElement;
    inputZipCode.value = address.properties.postcode;
  }

  return (
    <>
      <div id="api-container" className="mx-auto p-2 relative mb-3">
        <label className="text-center w-full" htmlFor="api-gouv">
          Adresse&nbsp;<span className="italic font-semibold">(Remplissage Automatique)</span>
        </label>
        <input
          onKeyDown={handleKeyStroke}
          className="block bg-fond w-full"
          type="text"
          id="api-gouv"
          name="api_gouv"
          placeholder="Entrez votre adresse"
        />
        <div
          id="address-container"
          className=" bg-accents2-light absolute w-5/6 divide-y divide-text border-solid border-texte rounded-lg z-10"
        ></div>
      </div>
    </>
  );
}

export default GouvApi;
