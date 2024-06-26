import { Lang } from "@/lib/types"

import { Skill } from "@/components/TutorialMetadata"

// Take all tutorials, and return a list of tutorials for a specific locale
export const filterTutorialsByLang = (
  internalTutorials: any[],
  externalTutorials: Array<any>,
  locale: Lang
): Array<any> => {
  const internalTutorialsMap = internalTutorials.map((tutorial) => {
    return {
      to: tutorial.to || "",
      title: tutorial?.title || "",
      description: tutorial?.description || "",
      author: tutorial?.author || "",
      tags: tutorial?.tags?.map((tag) => (tag || "").toLowerCase().trim()),
      skill: tutorial?.skill as Skill,
      timeToRead: tutorial?.timeToRead,
      published: tutorial?.published,
      lang: tutorial?.lang,
      isExternal: false,
    }
  })

  const externalTutorialsMap = externalTutorials.map<any>((tutorial: any) => ({
    to: tutorial.url,
    title: tutorial.title,
    description: tutorial.description,
    author: tutorial.author,
    tags: tutorial.tags.map((tag) => tag.toLowerCase().trim()),
    skill: tutorial.skillLevel as Skill,
    timeToRead: Number(tutorial.timeToRead),
    published: new Date(tutorial.publishDate).toISOString(),
    lang: tutorial.lang || "en",
    isExternal: true,
  }))

  const allTutorials: Array<any> = [
    ...externalTutorialsMap,
    ...internalTutorialsMap,
  ]

  const filteredTutorials = allTutorials
    .filter((tutorial) => tutorial.lang === locale)
    .sort((a, b) => {
      if (a.published && b.published) {
        return new Date(b.published).getTime() - new Date(a.published).getTime()
      }
      // Dont order if no published is present
      return 0
    })

  return filteredTutorials
}

export const getSortedTutorialTagsForLang = (
  filteredTutorialsByLang: Array<any> = []
) => {
  const allTags = filteredTutorialsByLang.reduce<Array<string>>(
    (tags, tutorial) => {
      return [...tags, ...(tutorial.tags || [])]
    },
    []
  )

  const reducedTags = allTags.reduce((acc, tag) => {
    if (acc[tag]) {
      acc[tag] = acc[tag] + 1
    } else {
      acc[tag] = 1
    }
    return acc
  }, {})

  const sortedTags = Object.keys(reducedTags)
    .sort()
    .reduce((obj, key) => {
      obj[key] = reducedTags[key]
      return obj
    }, {})

  return sortedTags
}
