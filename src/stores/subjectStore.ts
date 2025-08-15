import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Api } from "../services";
import { useGlobalVarsStore } from './globalVars';

export const useSubjectStore = defineStore('subjectStore', () => {

    const GlobalVars = useGlobalVarsStore();
    const AvailableSubjects = ref([]);
    
    class Subject{
        constructor(_subject){
            name:_subject.name || "";
            sex:_subject.sex|| "X";
            age:_subject.age || "unknown"
        }
    }

    const GetAvailableSubjects = async()=>{
        if(AvailableSubjects?.value.length){return}
        try{
            await Api.qdb.getSubjects(GlobalVars.DATASET_ID).then(response =>{
                const uniqueSubjects = Array.from(
                     new Set(response.data.result.map(obj => obj.subject))
                  );
                AvailableSubjects.value = getSubjectMetaData(uniqueSubjects);
            })
        }
        catch(e){
            console.error("could not get available subjects",e)
        }
    }

    const mapSubjectsAgainstUUID = ()=>{
        const client = algoliasearch('ALGOLIA_APPLICATION_ID', 'ALGOLIA_API_KEY');

        // Call the API
        const response = await client.searchForFacetValues({ indexName: 'indexName', facetName: 'facetName' });
    }
    //Placeholder function for getting metadata from a subject
    const getSubjectMetaData = (subjectArray)=>{
        console.log(subjectArray)
        return subjectArray.map(subject => new Subject(subject));
    }

  return { 
    AvailableSubjects,
    GetAvailableSubjects
 }
})
