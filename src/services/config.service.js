const config = {
  providers: [
    {
      code: 'lc',
      name: 'Library of Congress',
      link:  'https://lccn.loc.gov/{id}',
    },
    {
      code: 'bl',
      name: 'British Library',
      link: 'http://explore.bl.uk/',
    },
    {
      code: 'classify',
      name: 'OCLC Classify',
      link: 'http://classify.oclc.org/classify2/',
    },
    {
      code: 'libris',
      name: 'Libris',
      link: 'https://libris.kb.se/bib/{id}?vw=full&tab3=marc',
    },
    {
      code: 'gbv',
      name: 'GBV',
      link: 'https://www.gbv.de/',
    },
  ],
  vocabularies: {
    realfagstermer: {
      key: 'realfagstermer',
      name: 'Realfagstermer',
      index_language: 'nb',
      marc_code: 'noubomn',
      marc_fields: ['648', '650', '651', '655'],
      skosmos_types: [
        'http://data.ub.uio.no/onto#Topic',
        'http://data.ub.uio.no/onto#Place',
        'http://data.ub.uio.no/onto#Time',
        'http://data.ub.uio.no/onto#GenreForm',
        'http://data.ub.uio.no/onto#ComplexConcept',
      ],
    },
    humord: {
      key: 'humord',
      name: 'Humord',
      index_language: 'nb',
      marc_code: 'humord',
      marc_fields: ['648', '650', '651', '655'],
    },
    tekord: {
      key: 'tekord',
      name: 'Tekord',
      index_language: 'nb',
      marc_code: 'tekord',
      marc_fields: ['648', '650', '651', '655'],
    },
    lskjema: {
      key: 'lskjema',
      name: 'L-skjema',
      index_language: 'nb',
      marc_code: 'l-skjema',
      marc_fields: ['650'],
    },
    mesh: {
      key: 'mesh',
      name: 'MESH',
      index_language: 'en',
      marc_ind2: '2',
      marc_fields: ['650'],
    },
    nlm: {
      key: 'nlm',
      name: 'NLM',
      index_language: 'en',
      marc_fields: ['060'],
    },
    udc: {
      key: 'udc',
      name: 'UDC',
      index_language: 'en',
      marc_fields: ['060'],
    },
    ddc23nor: {
      key: 'ddc23nor',
      name: 'Norsk WebDewey',
      index_language: 'nb',
      marc_code: 'ddc23/nor',
      marc_fields: ['082', '083'],
      skosmos_code: 'ddc',
      skosmos_types: [
        'skos:Concept'
      ],
    },
    msc70: {
      key: 'msc70',
      name: 'MSC (UBO)',
      index_language: 'nb',
      marc_code: 'msc',
      marc_fields: ['084'],
      skosmos_code: 'msc-ubo',
      skosmos_types: [
        'skos:Concept'
      ],
    },
  }
}

export default config
