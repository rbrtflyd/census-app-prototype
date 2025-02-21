import { CText } from '~/components/Text/CText';
import { Text, Flex, Heading } from '@radix-ui/themes';

export default function StylesRoute() {
  return (
    <div className="mx-auto w-full max-w-[800px] gap-8 flex flex-col">
      <div className="flex items-center justify-between gap-2 py-8 border-b border-base">
        <CText variant="large-heading-01">Census Style Guide</CText>
        <CText>v0.0.1</CText>
      </div>

      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <CText variant="heading-01">Heading 01</CText>
          <CText variant="body-02">Body 02</CText>
          <CText variant="body-01">Body 01</CText>
          <CText variant="small-heading-01">Small Heading 01</CText>
          <CText variant="small-heading-00">Small Heading 00</CText>
          <CText variant="small-body-01">Small Body 01</CText>
        </section>

        <section>
          <Heading
            size="6"
            mb="4">
            Text Styles
          </Heading>

          <Flex
            direction="column"
            gap="4">
            <div>
              <Text
                weight="bold"
                mb="2">
                Bold
              </Text>
              <Text weight="bold">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>

            <div>
              <Text
                weight="bold"
                mb="2">
                Italic
              </Text>
              <Text>The quick brown fox jumps over the lazy dog</Text>
            </div>

            <div>
              <Text
                weight="bold"
                mb="2">
                Underline
              </Text>
              <Text style={{ textDecoration: 'underline' }}>
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
          </Flex>
        </section>
      </div>
    </div>
  );
}
