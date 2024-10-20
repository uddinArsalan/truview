import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { subHours } from "date-fns";

// const prisma = new PrismaClient({
//   log: ["error", "query", "warn"],
// });
const prisma = new PrismaClient();

function createRandomUsersAndPosts() {
  const sexType = faker.person.sexType();
  const firstName = faker.person.firstName(sexType);
  const email = faker.internet.email({ firstName });
  const username = faker.internet.userName({ firstName });
  const auth0Id = faker.database.mongodbObjectId();
  const userId = faker.database.mongodbObjectId();

  const fakePosts = Array.from({ length: 3 }).map((_, i) => ({
    content: faker.lorem.sentence(),
    authorId: userId,
    imageUrl: `https://picsum.photos/id/${Math.floor(
      Math.random() * 101
    )}/400/400`,
    createdAt: subHours(new Date(), i),
  }));

  return {
    users: {
      id: userId,
      auth0Id,
      username,
      email,
    },
    posts: fakePosts,
  };
}

async function main() {
  const fakeData = Array.from({ length: 4 }, createRandomUsersAndPosts);
  for (const fake of fakeData) {
    const user = await prisma.user.create({
      data: fake.users,
    });
    const post = await prisma.post.createMany({
      data: fake.posts,
    });
    console.log("Seed data created");
    console.log(user);
    console.log(post);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
