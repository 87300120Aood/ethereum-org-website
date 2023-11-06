import { useRouter } from "next/router"
import { MdExpandMore } from "react-icons/md"
import {
  Box,
  Flex,
  type FlexProps,
  type HeadingProps,
  Icon,
  List,
  ListItem,
  Show,
  Text,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp, Lang /* Context */ } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"

import BeaconChainActions from "@/components/BeaconChainActions"
import Breadcrumbs from "@/components/Breadcrumbs"
import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import { BaseLink } from "@/components/Link"
import {
  ContentContainer,
  InfoColumn,
  MobileButton,
  MobileButtonDropdown,
  Page as MdPage,
  StyledButtonDropdown,
} from "@/components/MdComponents"
import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import OldHeading from "@/components/OldHeading"
import ShardChainsList from "@/components/ShardChainsList"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"

// import Translation from "@/components/Translation"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { isLangRightToLeft } from "@/lib/utils/translations"

const Page = (props: FlexProps) => <MdPage sx={{}} {...props} />

const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

const InfoTitle = (props: HeadingProps) => (
  <Title
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <ListItem color="text300" mb={0} {...props} />
)

const Container = (props: ChildOnlyProp) => (
  <Box position="relative" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    justify="flex-end"
    direction={{ base: "column-reverse", lg: "row" }}
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    minH="608px"
    maxH={{ base: "full", lg: "608px" }}
    w="full"
    {...props}
  />
)

const MoreContent = (props: ChildOnlyProp & { to: string }) => (
  <Flex
    as={BaseLink}
    bg="ednBackground"
    justify="center"
    p={4}
    w="full"
    _hover={{
      bg: "background.base",
    }}
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      direction="column"
      justify="flex-start"
      position={{ base: "relative", lg: "absolute" }}
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="sm"
      boxShadow={{ lg: cardBoxShadow }}
      maxW={{ base: "full", lg: "640px" }}
      p={8}
      top={{ lg: 24 }}
      left={{ lg: 24 }}
      zIndex={10}
      {...props}
    />
  )
}

const LastUpdated = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontStyle="italic"
    pt={4}
    mb={0}
    borderTop="1px"
    borderColor="border"
    {...props}
  />
)

// Upgrade layout components
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  ShardChainsList,
  UpgradeStatus,
  BeaconChainActions,
}

interface IProps extends ChildOnlyProp, MdPageContent {
  frontmatter: UpgradeFrontmatter
}
export const UpgradeLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate,
}) => {
  // TODO: Re-enabled after i18n is implemented
  // const { t } = useTranslation()
  const { locale } = useRouter()

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

  const summaryPoints = getSummaryPoints(frontmatter)

  const dropdownLinks: ButtonDropdownList = {
    text: "Guide to Ethereum upgrades", // t("page-upgrades-upgrades-guide"),
    ariaLabel: "Ethereum upgrades menu", // t("page-upgrades-upgrades-aria-label"),
    items: [
      {
        text: "The Beacon Chain", // t("page-upgrades-upgrades-beacon-chain"),
        to: "/roadmap/beacon-chain/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/beacon-chain/",
        },
      },
      {
        text: "The Merge", // t("page-upgrades-upgrades-docking"),
        to: "/roadmap/merge/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/merge/",
        },
      },
    ],
  }

  const lgBreakpoint = useToken("breakpoints", "lg")

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={slug} startDepth={1} mt={2} mb="8" />
          <Title>{frontmatter.title}</Title>
          <Box>
            <List listStyleType="disc">
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </List>
          </Box>
          <LastUpdated>
            {/* TODO: Re-enable after i18n implemented */}
            {/* <Translation id="page-last-updated" />:{" "} */}
            Page last updated:{" "}
            {getLocaleTimestamp(locale as Lang, lastUpdatedDate!)}
          </LastUpdated>
        </TitleCard>
        {frontmatter.image && (
          <Image
            flex="1 1 100%"
            maxW="min(100%, 816px)"
            style={{ objectFit: "cover" }}
            alignSelf="center"
            right={0}
            bottom={0}
            width={600}
            height={600}
            overflow="initial"
            src={frontmatter.image}
            alt={frontmatter.alt}
          />
        )}
      </HeroContainer>
      <Show above={lgBreakpoint}>
        <MoreContent to="#content">
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </MoreContent>
      </Show>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <Show above={lgBreakpoint}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <Show above={lgBreakpoint}>
              <InfoTitle>{frontmatter.title}</InfoTitle>
            </Show>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth || 2}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Show below={lgBreakpoint}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Container>
  )
}