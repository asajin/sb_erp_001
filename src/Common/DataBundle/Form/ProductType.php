<?php

namespace Common\DataBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProductType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('code')
            ->add('name')
            ->add('last_price')
            ->add('last_stock')
            ->add('last_add_date')
            ->add('unit')
            ->add('description')
            ->add('supplier')
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Common\DataBundle\Entity\Product'
        ));
    }

    public function getName()
    {
        return 'common_databundle_producttype';
    }
}