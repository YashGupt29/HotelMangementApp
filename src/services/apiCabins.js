import supabase, { supabaseUrl } from "./supabase";
// https://zkdkgrzzwdixahyrlkel.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
}

export async function createEditCabins(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}//storage/v1/object/public/cabin-images/${imageName}`;
  //creating/editing cabin
  let query = supabase.from("cabins");
  //Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }
  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //if their is a storgae error it will get deleted
  if (storageError) {
    console.log(storageError);
    const { error } = await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}
