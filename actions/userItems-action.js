'use server';
import { getUserId } from "@/lib/auth";
import { searchItemQuery } from "@/lib/itemQuery";
import { GetOrdersQuery } from "@/lib/order";
import { getAllItems, getAllItemsQuerry, getItemById, getItemsQueryby10Men, getItemsQueryby10Women, getItemsQueryBySectionAndGender, getItemsQueryMen, getItemsQueryWomen, getSectionsByGender, GetSectionsLimit4Query } from "@/lib/userItems";
import { cookies } from "next/headers";
//for men
export async function getItemsBy10MenAction() {

    try{
        const result = await getItemsQueryby10Men();
        if(!result.success){
            return {errors:result.errors}
        }
        return {success:true,data:result.data}
    }catch(error){
        console.error(error);
        return {
            errors:'something went displaying items!'
        }
    }
}
//for women
export async function getItemsBy10WomenAction() {
    try{
        const result = await getItemsQueryby10Women();
        if(!result.success){
            return {errors:result.errors}
        }
        return {success:true,data:result.data}
    }catch(error){
        console.error(error);
        return {
            errors:'something went displaying items!'
        }
    }
}
//get item by function action
export async function getItemByIdAction(itemId) {
        try{
            const result = await getItemById(itemId);
            if(!result.success){
                return {errors:result.errors}
                }
                return {success:true,data:result.data}
        }catch(error){
            console.error(error);
            return {
                errors:'something went displaying item!'
                }
        }
}
//get items by Men function action
export async function getItemsByMenAction(page = 1, itemsPerPage = 4) {
    try {
      const offset = (page - 1) * itemsPerPage;
      const result = await getItemsQueryMen(itemsPerPage, offset);
      if (!result.success) {
        return { errors: result.errors };
      }
      return { success: true, data: result.data };
    } catch (error) {
      console.error(error);
      return {
        errors: 'Something went wrong displaying items!'
      };
    }
  }
  
//get items by women function action
export async function getItemsByWomenAction(page = 1, itemsPerPage = 4) {
    try {
      const offset = (page - 1) * itemsPerPage;
      const result = await getItemsQueryWomen(itemsPerPage, offset);
      if (!result.success) {
        return { errors: result.errors };
      }
      return { success: true, data: result.data };
    } catch (error) {
      console.error(error);
      return {
        errors: 'Something went wrong displaying items!'
      };
    }
  }
  
//get items by section
export async function getItemsBySectionAction(sectionName, gender) {
        try{
            const result = await getItemsQueryBySectionAndGender(sectionName, gender);
            if(!result.success){
                return {errors:result.errors}
                }
                return {success:true,data:result.data}
        }catch(error){
            console.error(error);
            return {
                errors:'something went displaying items!'
            }
        }
}
//get section where item.gender = *** 
export async function getSectionsByGenderAction(gender) {
        try{
            const result = await getSectionsByGender(gender);
            if(!result.success){
                return {errors:result.errors}
                }
                return {success:true,data:result.data}
        }catch(error){
            console.error(error);
            return {
                errors:'something went displaying items!'
            }
        }

}
//get orders action function
export async function getOrdersAction() {
     const sessionCookie = (await cookies()).get("auth_session")?.value;
        const userId = await getUserId(sessionCookie);
        if (!userId) {
            throw new Error("Invalid session.");
            }
    try{
        const result = await GetOrdersQuery();
        if(!result.success){
            return {errors:result.errors}
        }
        return {success:true, data:result.data}
    }catch(error){
        console.error(error);
        return {
            errors:'something went displaying orders!'  
            }
    }

}
//search item action function
export async function searchItemAction(formData) {
    const searchQuery = formData.get('searchTerm');   
    try{
        if(searchQuery.length === 0){
            return{
                success: false,
                }
        }
        const result = await searchItemQuery(searchQuery);
        if(!result.success){
            return{
                success: false,
                errors: result.errors
                }
        }
        console.log('items searched:'+result.data);
    return {
        success: true,
        data: result.data
    }
    }catch(error){
        console.error(error);
        return {
            success: false,
            errors: error.message || "Something went wrong.",
        }
    }    
}
//get sections limit 4 action function
export async function getSectionsLimit4Action() {
    try {
        const result = await GetSectionsLimit4Query();
        if (!result.success) {
            return { errors: result.errors }
        }
        return { success: true, data: result.data }
    } catch(error) {
        console.error(error);
        return { errors: 'Something went wrong.' }
    }
 }


//get all items action function
export async function getallItemsAction(page = 1, itemsPerPage = 3,section) {
    try {
      const offset = (page - 1) * itemsPerPage;
      const result = await getAllItemsQuerry(itemsPerPage, offset,section);
      if (!result.success) {
        return { errors: result.errors };
      }
      return { success: true, data: result.data };
    } catch (error) {
      console.error(error);
      return {
        errors: 'Something went wrong displaying items!'
      };
    }
  }