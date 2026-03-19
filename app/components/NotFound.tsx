import {Button} from './Button';
import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';

export function NotFound({type = 'page'}: {type?: string}) {
  const heading = 'Página não encontrada';
  const description =
    'Não conseguimos encontrar o que você procura. Verifique o endereço ou volte para a página inicial.';

  return (
    <>
      <PageHeader heading={heading}>
        <Text width="narrow" as="p">
          {description}
        </Text>
        <Button width="auto" variant="secondary" to={'/'}>
          Voltar para a página inicial
        </Button>
      </PageHeader>
      <FeaturedSection />
    </>
  );
}
