
const  fetchDrugInteractions= async(genes, drugTypes, interactionSources)=> {
    try {
      const response = await fetch(
        `http://dgidb.org/api/v1/interactions.json?genes=${genes}&drug_types=${drugTypes}&interaction_sources=${interactionSources}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch drug interaction data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching drug interaction data:', error.message);
      return null;
    }
  }
  
  export { fetchDrugInteractions };
