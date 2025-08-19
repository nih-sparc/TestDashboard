import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Api } from "../services";
import { useGlobalVarsStore } from './globalVars';

class Subject {
    constructor(
      public name: string,                           
      public sex: string | null = "X",           
      public age: string | number | null = "Unknown",  
      public datasetUuid: string | null = "",  
      public id: string | null = ""     
    ) {}
  }

export const useSubjectStore = defineStore('subjectStore', () => {

    const GlobalVars = useGlobalVarsStore();

    const DistinctSubjects = ref<Subject[]>([]);

    const GetDistinctSubjects = async()=>{
        if(DistinctSubjects.value.length){return}
        try{
            const response = await Api.qdb.getAllInstances(null)
            const uniqueSubjects = extractUniqueSubjects(response)
            const validSubjects = await filterForValidSubs(uniqueSubjects);
            DistinctSubjects.value = getSubjectMetaData(validSubjects);
        }
        catch(e){
            console.error("could not get distinct subjects",e)
        }
    }

    function extractUniqueSubjects(rows): Subject[] {
        const seen = new Set<string>();
        const unique: Subject[] = [];

        for (const row of rows) {
            const subj = row.subject?.trim();
            const ds = row.dataset?.trim();
            if (!subj || !ds) continue;

            const key = `${subj}::${ds}`; // composite key
            if (!seen.has(key)) {
            seen.add(key);
            unique.push(new Subject(row.subject,null,null,row.dataset,key));
            }
        }
        return unique;
    }

    //match subject's dataset uuid with valid algolia ids
    const filterForValidSubs = async(uniqueSubjects:any)=>{

        try{
            const services:any = GlobalVars.getServices();
            const algoliaClient = services?.AlgoliaClient;
            const algoliaConfig = services?.AlgoliaConfig;
      
            if (!algoliaClient || !algoliaConfig?.indexName) {
              return uniqueSubjects; // no filtering if Algolia is not provided
            }
            const response = await services.AlgoliaClient.searchForFacetValues( {indexName: services.AlgoliaConfig.indexName, facetName: uniqueSubjects[0].datasetUuid} );
        }catch(x){
            console.error(x)
        }
    }
    //Placeholder function for getting metadata from a subject
    const getSubjectMetaData = (subjectArray)=>{
        return subjectArray.map(name => ({
            name,
            sex: "F",  // Hardcoded for now
            age: "50"
          }));
    }

  return { 
    DistinctSubjects,
    GetDistinctSubjects
 }
})
