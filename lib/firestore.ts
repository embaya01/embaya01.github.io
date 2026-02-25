import { db } from "./firebase"
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  increment,
} from "firebase/firestore"

// ---- Profile ----
export interface ProfileData {
  name: string
  tagline: string
  title: string
  bio: string
  summary: string
  birthday: string
  website: string
  phone: string
  city: string
  degree: string
  email: string
  freelance: string
  address: string
  photoUrl: string
  twitter: string
  facebook: string
  instagram: string
  linkedin: string
  whatsappLink: string
}

export async function getProfile(): Promise<ProfileData | null> {
  const snap = await getDoc(doc(db, "settings", "profile"))
  if (snap.exists()) return snap.data() as ProfileData
  return null
}

export async function updateProfile(data: Partial<ProfileData>) {
  await setDoc(doc(db, "settings", "profile"), data, { merge: true })
}

// ---- Education ----
export interface EducationItem {
  id?: string
  title: string
  years: string
  institution: string
  details: string
  order: number
}

export async function getEducation(): Promise<EducationItem[]> {
  const snap = await getDocs(query(collection(db, "education"), orderBy("order")))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EducationItem))
}

export async function addEducation(data: Omit<EducationItem, "id">) {
  await addDoc(collection(db, "education"), data)
}

export async function updateEducation(id: string, data: Partial<EducationItem>) {
  await updateDoc(doc(db, "education", id), data)
}

export async function deleteEducation(id: string) {
  await deleteDoc(doc(db, "education", id))
}

// ---- Experience ----
export interface ExperienceItem {
  id?: string
  title: string
  years: string
  company: string
  details: string[]
  order: number
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const snap = await getDocs(query(collection(db, "experience"), orderBy("order")))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceItem))
}

export async function addExperience(data: Omit<ExperienceItem, "id">) {
  await addDoc(collection(db, "experience"), data)
}

export async function updateExperience(id: string, data: Partial<ExperienceItem>) {
  await updateDoc(doc(db, "experience", id), data)
}

export async function deleteExperience(id: string) {
  await deleteDoc(doc(db, "experience", id))
}

// ---- Skills ----
export interface SkillItem {
  id?: string
  name: string
  iconUrl: string
  order: number
}

export async function getSkills(): Promise<SkillItem[]> {
  const snap = await getDocs(query(collection(db, "skills"), orderBy("order")))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SkillItem))
}

export async function addSkill(data: Omit<SkillItem, "id">) {
  await addDoc(collection(db, "skills"), data)
}

export async function updateSkill(id: string, data: Partial<SkillItem>) {
  await updateDoc(doc(db, "skills", id), data)
}

export async function deleteSkill(id: string) {
  await deleteDoc(doc(db, "skills", id))
}

// ---- Services ----
export interface ServiceItem {
  id?: string
  title: string
  description: string
  icon: string
  order: number
}

export async function getServices(): Promise<ServiceItem[]> {
  const snap = await getDocs(query(collection(db, "services"), orderBy("order")))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem))
}

export async function addService(data: Omit<ServiceItem, "id">) {
  await addDoc(collection(db, "services"), data)
}

export async function updateService(id: string, data: Partial<ServiceItem>) {
  await updateDoc(doc(db, "services", id), data)
}

export async function deleteService(id: string) {
  await deleteDoc(doc(db, "services", id))
}

// ---- Projects ----
export interface ProjectItem {
  id?: string
  title: string
  category: string
  description: string
  imageUrl: string
  githubUrl: string
  liveUrl: string
  order: number
}

export async function getProjects(): Promise<ProjectItem[]> {
  const snap = await getDocs(query(collection(db, "projects"), orderBy("order")))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectItem))
}

export async function addProject(data: Omit<ProjectItem, "id">) {
  await addDoc(collection(db, "projects"), data)
}

export async function updateProject(id: string, data: Partial<ProjectItem>) {
  await updateDoc(doc(db, "projects", id), data)
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projects", id))
}

// ---- Page Views / Traffic ----
export async function recordPageView() {
  const today = new Date().toISOString().split("T")[0]
  const ref = doc(db, "analytics", today)
  try {
    await setDoc(ref, { views: increment(1), date: today }, { merge: true })
  } catch {
    await setDoc(ref, { views: 1, date: today })
  }
}

export interface DailyView {
  date: string
  views: number
}

export async function getAnalytics(): Promise<DailyView[]> {
  const snap = await getDocs(query(collection(db, "analytics"), orderBy("date")))
  return snap.docs.map((d) => d.data() as DailyView)
}

// ---- Resume URL ----
export async function getResumeUrl(): Promise<string> {
  const snap = await getDoc(doc(db, "settings", "resume"))
  if (snap.exists()) return snap.data().url || "/Elisee_Mbaya_Resume.pdf"
  return "/Elisee_Mbaya_Resume.pdf"
}

export async function updateResumeUrl(url: string) {
  await setDoc(doc(db, "settings", "resume"), { url }, { merge: true })
}
