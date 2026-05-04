import { users as seed, type User, type UserStatus } from "@/mock-data/users";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Estado en memoria (simula backend). No persiste entre recargas.
 * Prioridad: experiencia visual para capturas.
 */
let usersState: User[] = [...seed];

export async function getUsers(): Promise<User[]> {
  await sleep(150);
  return [...usersState].sort((a, b) => a.fullName.localeCompare(b.fullName));
}

export async function setUserStatus(
  id: string,
  status: UserStatus
): Promise<User | undefined> {
  await sleep(200);

  const idx = usersState.findIndex((u) => u.id === id);
  if (idx === -1) return undefined;

  const updated: User = { ...usersState[idx], status };
  usersState = [...usersState.slice(0, idx), updated, ...usersState.slice(idx + 1)];
  return updated;
}
