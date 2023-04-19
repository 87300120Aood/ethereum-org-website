import React from "react"
import { Center, Heading, Box, Flex, chakra, BoxProps } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"
import PageHero from "../components/PageHero"
import Translation from "../components/Translation"
import Callout from "../components/Callout"
import Link from "../components/Link"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import HorizontalCard from "../components/HorizontalCard"
import CardList from "../components/CardList"
import { StyledCard } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getImage, getSrc } from "../utils/image"
import { Context } from "../types"

const StyledRightColumn = (props: { children: React.ReactNode }) => (
  <Box flex="0 1 50%" ml={{ lg: 4 }} maxW="full" {...props} />
)

// const StyledGrayContainer = chakra(GrayContainer)

const StyledGrayContainer = (props: { children: React.ReactNode }) => (
  <GrayContainer marginTop={{ lg: 4 }} {...props} />
)
const GrayContainer = (props: BoxProps) => (
  <Box
    width={"100%"}
    padding={"4rem 0rem"}
    marginTop={"2rem"}
    background="grayBackground"
    boxShadow={"inset 0px 1px 0px tableItemBoxShadow"}
    {...props}
  />
)

const FindWallet = chakra(GatsbyImage)

// const IntroTwoColumnContent = chakra(TwoColumnContent)
const IntroTwoColumnContent = (props: { children: React.ReactNode }) => (
  <TwoColumnContent marginBottom={0} paddingBottom={0} {...props} />
)
const TwoColumnContent = (props: BoxProps) => (
  <Content
    display="flex"
    justifyContent="space-between"
    padding="2rem"
    marginBottom="3rem"
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const StyledTwoColumnContent = chakra(TwoColumnContent)

// const Intro = chakra(Content)
const Intro = (props: { children: React.ReactNode }) => (
  <Content paddingBottom={0} sx={{ h2: { mb: 0 } }} {...props} />
)
const Content = (props: BoxProps) => (
  <Box padding={"1rem 2rem"} width="100%" {...props} />
)

const GradientContainer = chakra(GrayContainer)

const ChecklistItem = chakra(HorizontalCard)

const WalletType = chakra(HorizontalCard)

const StyledCallout = chakra(Callout)

// const CalloutCardContainer = chakra(CardContainer)
const CalloutCardContainer = (props: { children: React.ReactNode }) => (
  <CardContainer marginTop={16} {...props} />
)
const CardContainer = (props: BoxProps) => (
  <Box
    display={"flex"}
    flexWrap={"wrap"}
    marginLeft={-4}
    marginRight={-4}
    {...props}
  />
)

// Divider
const Divider = (props: BoxProps) => (
  <Box
    mb="4rem"
    mt="4rem"
    w="10%"
    h="0.25rem"
    bgColor="homeDivider"
    {...props}
  />
)

// Page
const Page = (props: BoxProps) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    width="100%"
    maxW="1200px"
    margin="0 auto"
    {...props}
  />
)

const cards = [
  {
    emoji: ":dollar:",
    title: <Translation id="page-wallets-manage-funds" />,
    description: <Translation id="page-wallets-manage-funds-desc" />,
  },
  {
    emoji: ":frame_with_picture:",
    title: <Translation id="page-wallets-your-ethereum-account" />,
    description: <Translation id="page-wallets-your-ethereum-account-desc" />,
  },
  {
    emoji: ":bust_in_silhouette:",
    title: <Translation id="page-wallets-your-login" />,
    description: <Translation id="page-wallets-your-login-desc" />,
  },
]

const types = [
  {
    emoji: ":cd:",
    description: <Translation id="page-wallets-cd" />,
  },
  {
    emoji: ":mobile_phone:",
    description: <Translation id="page-wallets-mobile" />,
  },
  {
    emoji: ":globe_with_meridians:",
    description: <Translation id="page-wallets-web-browser" />,
  },
  {
    emoji: ":globe_with_meridians:",
    description: <Translation id="page-wallets-web-browser-extension" />,
  },
  {
    emoji: ":desktop_computer:",
    description: <Translation id="page-wallets-desktop" />,
  },
]

const articles = [
  {
    title: <Translation id="page-wallets-protecting-yourself" />,
    description: "MyCrypto",
    link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
  },
  {
    title: <Translation id="page-wallets-keys-to-safety" />,
    description: <Translation id="page-wallets-blog" />,
    link: "https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto",
  },
  {
    title: <Translation id="page-wallets-how-to-store" />,
    description: "ConsenSys",
    link: "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
  },
]

const guides = [
  {
    title: (
      <Translation id="additional-reading-how-to-register-an-ethereum-account" />
    ),
    link: "/guides/how-to-register-an-ethereum-account/",
  },
  {
    title: <Translation id="additional-reading-how-to-use-a-wallet" />,
    link: "/guides/how-to-use-a-wallet/",
  },
]

const WalletsPage = ({
  data,
}: PageProps<Queries.WalletsPageQuery, Context>) => {
  const { t } = useTranslation()

  const heroContent = {
    title: t("page-wallets-title"),
    header: t("page-wallets-slogan"),
    subtitle: t("page-wallets-subtitle"),
    image: getImage(data.hero)!,
    alt: t("page-wallets-alt"),
    buttons: [
      {
        to: "/wallets/find-wallet/",
        content: t("page-wallets-find-wallet-link"),
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-wallets-meta-title")}
        description={t("page-wallets-meta-description")}
        image={getSrc(data.ogImage)}
      />
      <PageHero content={heroContent} isReverse />
      <StyledGrayContainer>
        <Intro>
          <Heading>
            <Translation id="page-wallets-whats-a-wallet" />
          </Heading>
        </Intro>
        <IntroTwoColumnContent>
          <Box
            flexGrow="0"
            flexShrink="1"
            flexBasis="50%"
            mr={{ base: 0, lg: 8 }}
            mt={{ lg: 0 }}
            maxWidth={{ lg: "100%" }}
          >
            <p>
              <Translation id="page-wallets-description" />
            </p>
            <p>
              <Translation id="page-wallets-desc-2" />{" "}
            </p>
            <CardList content={guides} />
          </Box>
          <StyledRightColumn>
            <p>
              <Translation id="page-wallets-desc-3" />
            </p>
            <p>
              <Translation id="page-wallets-desc-4" />
            </p>
          </StyledRightColumn>
        </IntroTwoColumnContent>
        <Content>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </StyledGrayContainer>
      <StyledTwoColumnContent marginBottom={-8} marginTop={8}>
        <Box
          flexGrow="0"
          flexShrink="1"
          flexBasis="50%"
          mr={{ base: 0, lg: 8 }}
          mt={{ lg: 0 }}
          maxWidth={{ lg: "100%" }}
        >
          <Heading>
            <Translation id="page-wallets-accounts-addresses" />
          </Heading>
          <p>
            <Translation id="page-wallets-accounts-addresses-desc" />
          </p>
          <ul>
            <li>
              <p>
                <Translation id="page-wallets-ethereum-account" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-wallets-accounts-ethereum-addresses" />
              </p>
            </li>
            <li>
              <p>
                <Translation id="page-wallets-ethereum-wallet" />
              </p>
            </li>
          </ul>
          <p>
            <Translation id="page-wallets-most-wallets" />
          </p>
        </Box>
        <Box
          flexGrow="0"
          flexShrink="1"
          flexBasis="50%"
          marginTop={{ lg: 12 }}
          maxWidth={{ lg: "100%" }}
          marginLeft={{ base: 8, lg: 0 }}
        >
          <Heading>
            <Translation id="page-wallets-types" />
          </Heading>
          <p>
            <Translation id="page-wallets-types-desc" />
          </p>
          <div>
            {types.map((type, idx) => (
              <WalletType
                minWidth="100%"
                marginTop={2}
                marginBottom={2}
                marginLeft={0}
                marginRight={0}
                key={idx}
                emoji={type.emoji}
                description={type.description}
                emojiSize={2.5}
              />
            ))}
          </div>
        </Box>
      </StyledTwoColumnContent>
      <GradientContainer
        bgGradient="linear-gradient(49.21deg, rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%)"
      >
        <Content>
          <Flex flexDirection="column" alignItems="center" mb="8">
            <Heading>
              <Translation id="page-wallets-features-title" />
            </Heading>
            <Box
              fontSize={"xl"}
              lineHeight={"140%"}
              color="text"
              marginBottom={6}
              textAlign={"center"}
            >
              <Translation id="page-wallets-features-desc" />
            </Box>
            <ButtonLink to="/wallets/find-wallet/">
              <Translation id="page-wallets-find-wallet-btn" />
            </ButtonLink>
            <FindWallet
              image={getImage(data.findWallet)!}
              alt=""
              marginTop={8}
              maxWidth="800px"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              width="100%"
            />
          </Flex>
        </Content>
      </GradientContainer>
      <TwoColumnContent>
        <Box
          flexGrow="0"
          flexShrink="1"
          flexBasis="50%"
          mr={{ base: 0, lg: 8 }}
          mt={{ lg: 0 }}
          maxWidth={{ lg: "100%" }}
        >
          <Heading>
            <Translation id="page-wallets-stay-safe" />
          </Heading>
          <Box
            fontSize={"xl"}
            lineHeight={"140%"}
            marginBottom={6}
            color="text300"
          >
            <Translation id="page-wallets-stay-safe-desc" />
          </Box>
          <div>
            <ChecklistItem
              border={0}
              display="flex"
              alignItems="flex-start"
              marginBottom={4}
              key="0"
              emoji=":white_check_mark:"
              title={t("page-wallets-take-responsibility")}
              description={t("page-wallets-take-responsibility-desc")}
            />
            <ChecklistItem
              border={0}
              display="flex"
              alignItems="flex-start"
              marginBottom={4}
              key="1"
              emoji=":white_check_mark:"
              title={t("page-wallets-seed-phrase")}
              description={t("page-wallets-seed-phrase-desc")}
            >
              <p>
                <Translation id="page-wallets-seed-phrase-example" />
              </p>
              <Box bg="black" p="2" mb="4" borderRadius="base">
                <Box fontFamily="monospace" color="white" mb="0">
                  <Translation id="page-wallets-seed-phrase-snippet" />
                </Box>
              </Box>
              <p>
                <Translation id="page-wallets-seed-phrase-write-down" />
              </p>
            </ChecklistItem>
            <ChecklistItem
              border={0}
              display="flex"
              alignItems="flex-start"
              marginBottom={4}
              key="2"
              emoji=":white_check_mark:"
              title={t("page-wallets-bookmarking")}
              description={t("page-wallets-bookmarking-desc")}
            />
            <ChecklistItem
              border={0}
              display="flex"
              alignItems="flex-start"
              marginBottom={4}
              key="3"
              emoji=":white_check_mark:"
              title={t("page-wallets-triple-check")}
              description={t("page-wallets-triple-check-desc")}
            />
          </div>
        </Box>
        <Box
          flexGrow="0"
          flexShrink="1"
          flexBasis="50%"
          marginTop={{ lg: 12 }}
          maxWidth={{ lg: "100%" }}
          marginLeft={{ base: 8, lg: 0 }}
        >
          <Heading>
            <Translation id="page-wallets-tips" />
          </Heading>
          <Box
            fontSize={"xl"}
            lineHeight={"140%"}
            marginBottom={6}
            color="text300"
          >
            <Translation id="page-wallets-tips-community" />
          </Box>
          <CardList content={articles} />
        </Box>
      </TwoColumnContent>
      <Content>
        <Divider />
        <Heading>
          <Translation id="page-wallets-explore" />
        </Heading>
        <CalloutCardContainer>
          <StyledCallout
            flex="1 1 424px"
            minH="full"
            image={getImage(data.eth)}
            titleKey="page-wallets-get-some"
            alt={t("page-wallets-get-some-alt")}
            descriptionKey="page-wallets-get-some-desc"
          >
            <div>
              <ButtonLink to="/get-eth/">
                <Translation id="page-wallets-get-some-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            flex="1 1 424px"
            minH="full"
            image={getImage(data.dapps)}
            titleKey="page-wallets-try-dapps"
            alt={t("page-wallets-try-dapps-alt")}
            descriptionKey="page-wallets-try-dapps-desc"
          >
            <div>
              <ButtonLink to="/dapps/">
                <Translation id="page-wallets-more-on-dapps-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CalloutCardContainer>
      </Content>
      <Content>
        <Center w="100%">
          <QuizWidget quizKey="wallets" />
        </Center>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default WalletsPage

export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 200
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const listImage = graphql`
  fragment listImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query WalletsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-wallets", "learn-quizzes", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    findWallet: file(relativePath: { eq: "wallets/find-wallet.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 738
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    eth: file(relativePath: { eq: "eth-logo.png" }) {
      ...calloutImage
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      ...calloutImage
    }
  }
`
