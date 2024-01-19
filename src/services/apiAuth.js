import React from "react";
import supabase, { supabaseUrl } from "./supabase";
export async function signupApi({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //update avatar image
  const { data: updateUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        //https://zkdkgrzzwdixahyrlkel.supabase.co/storage/v1/object/public/avatars/avatar-dc99b768-dffa-4e11-9ae5-3baa5e7f1f51-0.8860393877532902
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) throw new Error(updateError);
  return updateUser;
}
