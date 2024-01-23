import { auth, currentUser } from '@clerk/nextjs';
import { Individual } from '@/models/user.model';
import { Teams } from '@/models/team.model';



export async function POST(request) {
  const data = await request.json();
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  // console.log(userId,user.emailAddresses[0].emailAddress,user.firstName);

  const currentEmailAddress = user.emailAddresses[0].emailAddress;
  const individual = await Individual.findOne({ email: currentEmailAddress });
  // console.log(individual);

  if (!individual) {
    const newIndividual = new Individual({
      email: user.emailAddresses[0].emailAddress,
      username: user.firstName,
      userId: userId,
      status: "active",
      teams: []
    })
    await newIndividual.save();
    const newTeam = new Teams({
      teamName: data.teamName,
      members: [newIndividual._id],
      leader: newIndividual._id,
      teamDesc: data.teamDesc
    })
    await newTeam.save();
    console.log(newTeam)
    newIndividual.teams.push(newTeam);
    await newIndividual.save();
    // console.log(newIndividual);
    return Response.json({ "success": true })
  }
  const newTeam = new Teams({
    teamName: data.teamName,
    members: [individual._id],
    leader: individual._id,
    teamDesc: data.teamDesc
  })
  console.log(newTeam)
  await newTeam.save();
  individual.teams.push(newTeam);
  await individual.save();
  // console.log(individual);
  return Response.json({ "success": true })
}